export function publicUser(user) {
  if (!user) return null;
  const plain = user.toJSON ? user.toJSON() : { ...user };
  delete plain.password_hash;
  delete plain.password;
  return plain;
}

export function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, Number(value) || 0));
}
