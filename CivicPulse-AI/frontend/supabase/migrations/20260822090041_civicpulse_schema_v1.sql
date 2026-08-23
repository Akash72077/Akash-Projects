/*
# CivicPulse AI - Core Schema

## Overview
Creates the database tables for a civic complaint management platform where citizens report local issues (potholes, garbage, broken streetlights, etc.) and authorities manage them. AI analysis is simulated client-side and stored with each complaint.

## New Tables
- profiles: extends auth.users with full_name, role (citizen/authority), department
- complaints: core complaint records with AI fields, status, photos, location
- supporters: tracks "I also face this issue" support clicks (unique per user per complaint)

## Security (RLS)
- profiles: authenticated read all; update own only
- complaints: authenticated read all; insert own; update own OR authority; delete own
- supporters: authenticated read all; insert own; delete own

## Storage
- Public bucket complaint-photos for problem and after-repair photos

## Triggers
- handle_new_user: auto-creates profile on signup
- update_updated_at: auto-updates updated_at on complaint changes
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL DEFAULT '',
  role text NOT NULL DEFAULT 'citizen' CHECK (role IN ('citizen', 'authority')),
  department text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "read_all_profiles" ON profiles;
CREATE POLICY "read_all_profiles" ON profiles FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "update_own_profile" ON profiles;
CREATE POLICY "update_own_profile" ON profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE TABLE IF NOT EXISTS complaints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'other',
  severity text NOT NULL DEFAULT 'medium' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  priority_score integer NOT NULL DEFAULT 50 CHECK (priority_score >= 0 AND priority_score <= 100),
  suggested_department text NOT NULL DEFAULT 'General',
  ai_summary text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'reported' CHECK (status IN ('reported', 'verified', 'assigned', 'in_progress', 'resolved')),
  photo_url text,
  after_repair_photo_url text,
  latitude float8,
  longitude float8,
  location_text text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_complaints_status ON complaints(status);
CREATE INDEX IF NOT EXISTS idx_complaints_severity ON complaints(severity);
CREATE INDEX IF NOT EXISTS idx_complaints_priority ON complaints(priority_score DESC);
CREATE INDEX IF NOT EXISTS idx_complaints_category ON complaints(category);
CREATE INDEX IF NOT EXISTS idx_complaints_user_id ON complaints(user_id);
CREATE INDEX IF NOT EXISTS idx_complaints_created_at ON complaints(created_at DESC);

ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "read_all_complaints" ON complaints;
CREATE POLICY "read_all_complaints" ON complaints FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "insert_own_complaints" ON complaints;
CREATE POLICY "insert_own_complaints" ON complaints FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_complaints" ON complaints;
CREATE POLICY "update_complaints" ON complaints FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = user_id
    OR EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'authority')
  )
  WITH CHECK (
    auth.uid() = user_id
    OR EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'authority')
  );

DROP POLICY IF EXISTS "delete_own_complaints" ON complaints;
CREATE POLICY "delete_own_complaints" ON complaints FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS supporters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  complaint_id uuid NOT NULL REFERENCES complaints(id) ON DELETE CASCADE,
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(complaint_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_supporters_complaint_id ON supporters(complaint_id);
CREATE INDEX IF NOT EXISTS idx_supporters_user_id ON supporters(user_id);

ALTER TABLE supporters ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "read_all_supporters" ON supporters;
CREATE POLICY "read_all_supporters" ON supporters FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "insert_own_support" ON supporters;
CREATE POLICY "insert_own_support" ON supporters FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_support" ON supporters;
CREATE POLICY "delete_own_support" ON supporters FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_complaints_updated_at ON complaints;
CREATE TRIGGER trigger_complaints_updated_at
  BEFORE UPDATE ON complaints
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

INSERT INTO storage.buckets (id, name, public)
VALUES ('complaint-photos', 'complaint-photos', true)
ON CONFLICT DO NOTHING;

DROP POLICY IF EXISTS "read_complaint_photos" ON storage.objects;
CREATE POLICY "read_complaint_photos" ON storage.objects FOR SELECT
  TO anon, authenticated USING (bucket_id = 'complaint-photos');

DROP POLICY IF EXISTS "insert_complaint_photos" ON storage.objects;
CREATE POLICY "insert_complaint_photos" ON storage.objects FOR INSERT
  TO authenticated WITH CHECK (bucket_id = 'complaint-photos');

DROP POLICY IF EXISTS "update_complaint_photos" ON storage.objects;
CREATE POLICY "update_complaint_photos" ON storage.objects FOR UPDATE
  TO authenticated USING (bucket_id = 'complaint-photos') WITH CHECK (bucket_id = 'complaint-photos');
