import { randomUUID } from 'crypto';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Complaint from '../models/Complaint.js';
import { isMongoConnected } from '../config/database.js';

const now = () => new Date().toISOString();
const hoursAgo = (hours) => new Date(Date.now() - hours * 3600000).toISOString();
const daysAgo = (days) => new Date(Date.now() - days * 86400000).toISOString();

const demoUsers = [
  { id: 'citizen-demo', full_name: 'Demo Citizen', email: 'citizen@civicpulse.demo', password: 'citizen123', role: 'citizen', department: null, created_at: now() },
  { id: 'citizen-neha', full_name: 'Neha', email: 'neha@civicpulse.demo', password: 'citizen123', role: 'citizen', department: null, created_at: now() },
  { id: 'citizen-arjun', full_name: 'Arjun', email: 'arjun@civicpulse.demo', password: 'citizen123', role: 'citizen', department: null, created_at: now() },
  { id: 'citizen-sana', full_name: 'Sana', email: 'sana@civicpulse.demo', password: 'citizen123', role: 'citizen', department: null, created_at: now() },
  { id: 'authority-demo', full_name: 'Demo Authority', email: 'authority@civicpulse.demo', password: 'authority123', role: 'authority', department: 'Roads Department', created_at: now() },
  { id: 'contractor-demo', full_name: 'Demo Contractor', email: 'contractor@civicpulse.demo', password: 'contractor123', role: 'contractor', department: 'Roads Department', created_at: now() },
];

const baseComplaints = [
  {
    id: 'cmp-demo-1', user_id: 'citizen-neha', reporter_name: 'Neha', title: 'Large pothole near Cyber Towers', description: 'Deep pothole near the junction causing vehicles to swerve.', category: 'pothole', severity: 'high', priority_score: 86,
    suggested_department: 'Roads Department', ai_summary: 'Large pothole detected on a busy road and may cause accidents.', status: 'in_progress', photo_url: '/demo-issues/pothole.jpg', after_repair_photo_url: null,
    latitude: 17.44850, longitude: 78.37420, location_text: 'HITEC City, Hyderabad', area: 'HITEC City', supporters: ['citizen-demo', 'supporter-1', 'supporter-2', 'supporter-3', 'supporter-4', 'supporter-5'], assigned_to: 'Road Repair Team 4', duplicate_of: null, created_at: hoursAgo(2), updated_at: now()
  },
  {
    id: 'cmp-demo-2', user_id: 'citizen-arjun', reporter_name: 'Arjun', title: 'Garbage overflowing beside main road', description: 'Garbage bins are full and waste is spreading onto the road.', category: 'garbage', severity: 'medium', priority_score: 67,
    suggested_department: 'Sanitation & Waste Management', ai_summary: 'Accumulated garbage beside a busy road requires municipal cleanup.', status: 'assigned', photo_url: '/demo-issues/garbage.jpg', after_repair_photo_url: null,
    latitude: 17.44590, longitude: 78.37710, location_text: 'Madhapur, Hyderabad', area: 'Madhapur', supporters: ['supporter-6', 'supporter-7', 'supporter-8'], assigned_to: 'Sanitation Team 2', duplicate_of: null, created_at: hoursAgo(8), updated_at: now()
  },
  {
    id: 'cmp-demo-3', user_id: 'citizen-sana', reporter_name: 'Sana', title: 'Loose electric wire near school gate', description: 'The electric wire is hanging very low near the school entrance.', category: 'loose_electric_wire', severity: 'critical', priority_score: 97,
    suggested_department: 'Electricity Department', ai_summary: 'Low-hanging electric wire near a sensitive area creates an electrocution risk.', status: 'verified', photo_url: '/demo-issues/loose-electric-wire.jpg', after_repair_photo_url: null,
    latitude: 17.45020, longitude: 78.37290, location_text: 'HITEC City, Hyderabad', area: 'HITEC City', supporters: ['a','b','c','d','e','f','g','h','i','j','k'], assigned_to: null, duplicate_of: null, created_at: hoursAgo(5), updated_at: now()
  },
  {
    id: 'cmp-demo-4', user_id: 'citizen-arjun', reporter_name: 'Arjun', title: 'Deep pothole near Balanagar Metro gate', description: 'A wide pothole has formed beside the metro approach road.', category: 'pothole', severity: 'high', priority_score: 82,
    suggested_department: 'Roads Department', ai_summary: 'Large road pothole close to the metro entrance may endanger two-wheelers.', status: 'assigned', photo_url: '/demo-issues/pothole.jpg', after_repair_photo_url: null,
    latitude: 17.47672, longitude: 78.44816, location_text: 'Balanagar Metro, Hyderabad', area: 'Balanagar', supporters: ['u1','u2','u3','u4','u5','u6','u7','u8'], assigned_to: 'Road Repair Team 2', duplicate_of: null, created_at: hoursAgo(4), updated_at: now()
  },
  {
    id: 'cmp-demo-5', user_id: 'citizen-sana', reporter_name: 'Sana', title: 'Pothole beside Balanagar Metro entrance', description: 'There is a large pothole very close to the metro gate on the service lane.', category: 'pothole', severity: 'high', priority_score: 74,
    suggested_department: 'Roads Department', ai_summary: 'Possible duplicate pothole report close to an existing Balanagar road complaint.', status: 'reported', photo_url: '/demo-issues/pothole.jpg', after_repair_photo_url: null,
    latitude: 17.47690, longitude: 78.44829, location_text: 'Balanagar Metro, Hyderabad', area: 'Balanagar', supporters: ['u9','u10'], assigned_to: null, duplicate_of: 'cmp-demo-4', created_at: hoursAgo(1.5), updated_at: now()
  },
  {
    id: 'cmp-demo-6', user_id: 'citizen-demo', reporter_name: 'Demo Citizen', title: 'Streetlight not working', description: 'The streetlight has not worked for three nights and the lane is very dark.', category: 'broken_streetlight', severity: 'medium', priority_score: 58,
    suggested_department: 'Electricity Department', ai_summary: 'Non-functional streetlight is reducing nighttime visibility in a residential lane.', status: 'verified', photo_url: '/demo-issues/broken-streetlight.jpg', after_repair_photo_url: null,
    latitude: 17.43758, longitude: 78.44829, location_text: 'Ameerpet, Hyderabad', area: 'Ameerpet', supporters: ['m1','m2','m3','m4'], assigned_to: null, duplicate_of: null, created_at: hoursAgo(13), updated_at: now()
  },
  {
    id: 'cmp-demo-7', user_id: 'citizen-arjun', reporter_name: 'Arjun', title: 'Water leakage on main street', description: 'Clean water has been leaking continuously from a damaged pipe.', category: 'water_leakage', severity: 'high', priority_score: 79,
    suggested_department: 'Water Works Department', ai_summary: 'Continuous pipeline leakage is wasting water and making the road slippery.', status: 'in_progress', photo_url: '/demo-issues/water-leakage.jpg', after_repair_photo_url: null,
    latitude: 17.49320, longitude: 78.39910, location_text: 'Kukatpally, Hyderabad', area: 'Kukatpally', supporters: ['w1','w2','w3','w4','w5','w6'], assigned_to: 'Water Works Team 1', duplicate_of: null, created_at: hoursAgo(10), updated_at: now()
  },
  {
    id: 'cmp-demo-8', user_id: 'citizen-sana', reporter_name: 'Sana', title: 'Open manhole near bus stop', description: 'The manhole cover is missing near the bus stop and is dangerous at night.', category: 'open_manhole', severity: 'critical', priority_score: 94,
    suggested_department: 'Drainage & Sewerage', ai_summary: 'Open manhole in a pedestrian area presents an immediate fall and traffic hazard.', status: 'reported', photo_url: '/demo-issues/open-manhole.jpg', after_repair_photo_url: null,
    latitude: 17.43990, longitude: 78.49830, location_text: 'Secunderabad, Hyderabad', area: 'Secunderabad', supporters: ['s1','s2','s3','s4','s5','s6','s7','s8','s9'], assigned_to: null, duplicate_of: null, created_at: hoursAgo(0.75), updated_at: now()
  },
  {
    id: 'cmp-demo-9', user_id: 'citizen-neha', reporter_name: 'Neha', title: 'Drainage water overflowing', description: 'Drainage water is overflowing after rain and blocking one side of the lane.', category: 'drainage', severity: 'high', priority_score: 76,
    suggested_department: 'Drainage & Sewerage', ai_summary: 'Overflowing drainage is creating sanitation and access problems for nearby residents.', status: 'verified', photo_url: '/demo-issues/drainage.jpg', after_repair_photo_url: null,
    latitude: 17.44420, longitude: 78.37630, location_text: 'Madhapur, Hyderabad', area: 'Madhapur', supporters: ['d1','d2','d3','d4','d5'], assigned_to: null, duplicate_of: null, created_at: hoursAgo(6), updated_at: now()
  },
  {
    id: 'cmp-demo-10', user_id: 'citizen-arjun', reporter_name: 'Arjun', title: 'Damaged road surface near market', description: 'A long section of the road surface is broken and uneven near the market.', category: 'damaged_road', severity: 'medium', priority_score: 64,
    suggested_department: 'Roads Department', ai_summary: 'Uneven damaged road surface needs resurfacing before the condition worsens.', status: 'resolved', photo_url: '/demo-issues/damaged-road.jpg', after_repair_photo_url: null,
    latitude: 17.48410, longitude: 78.41370, location_text: 'Moosapet, Hyderabad', area: 'Moosapet', supporters: ['r1','r2'], assigned_to: 'Road Repair Team 1', duplicate_of: null, created_at: hoursAgo(72), updated_at: hoursAgo(7)
  },
  {
    id:'cmp-hot-b1', user_id:'citizen-neha', reporter_name:'Neha', title:'Open drainage channel beside school road', description:'An uncovered drain with stagnant wastewater is open beside the footpath.', category:'drainage', severity:'high', priority_score:88,
    suggested_department:'Drainage & Sewerage', ai_summary:'Open drainage with stagnant water creates sanitation and pedestrian safety risks.', status:'reported', photo_url:'/demo-issues/drainage.jpg', after_repair_photo_url:null,
    latitude:17.47610, longitude:78.44772, location_text:'Balanagar, Hyderabad', area:'Balanagar', supporters:['hb1','hb2','hb3','hb4','hb5','hb6','hb7'], assigned_to:null, duplicate_of:null, created_at:daysAgo(9), updated_at:now()
  },
  {
    id:'cmp-hot-b2', user_id:'citizen-arjun', reporter_name:'Arjun', title:'Garbage pile blocking service lane', description:'Mixed garbage has accumulated beside the service road and has not been cleared.', category:'garbage', severity:'medium', priority_score:73,
    suggested_department:'Sanitation & Waste Management', ai_summary:'Garbage accumulation is obstructing the lane and attracting stray animals.', status:'reported', photo_url:'/demo-issues/garbage.jpg', after_repair_photo_url:null,
    latitude:17.47725, longitude:78.44791, location_text:'Balanagar, Hyderabad', area:'Balanagar', supporters:['gb1','gb2','gb3','gb4'], assigned_to:null, duplicate_of:null, created_at:daysAgo(7), updated_at:now()
  },
  {
    id:'cmp-hot-b3', user_id:'citizen-sana', reporter_name:'Sana', title:'Loose electric cable near market', description:'A live-looking cable is hanging low above the roadside shops.', category:'loose_electric_wire', severity:'critical', priority_score:98,
    suggested_department:'Electricity Department', ai_summary:'Low-hanging electrical cable in a crowded market area requires urgent inspection.', status:'verified', photo_url:'/demo-issues/loose-electric-wire.jpg', after_repair_photo_url:null,
    latitude:17.47598, longitude:78.44880, location_text:'Balanagar, Hyderabad', area:'Balanagar', supporters:['eb1','eb2','eb3','eb4','eb5','eb6','eb7','eb8','eb9'], assigned_to:null, duplicate_of:null, created_at:daysAgo(3), updated_at:now()
  },
  {
    id:'cmp-hot-b4', user_id:'citizen-demo', reporter_name:'Demo Citizen', title:'Water pipeline leaking near metro road', description:'A damaged municipal pipe is continuously leaking water onto the road.', category:'water_leakage', severity:'high', priority_score:85,
    suggested_department:'Water Works Department', ai_summary:'Continuous water leakage is wasting water and weakening the road surface.', status:'assigned', photo_url:'/demo-issues/water-leakage.jpg', after_repair_photo_url:null,
    latitude:17.47745, longitude:78.44862, location_text:'Balanagar, Hyderabad', area:'Balanagar', supporters:['wb1','wb2','wb3','wb4','wb5'], assigned_to:'Water Works Team 3', duplicate_of:null, created_at:daysAgo(8), updated_at:now()
  },
  {
    id:'cmp-hot-b5', user_id:'citizen-neha', reporter_name:'Neha', title:'Streetlights dark for several nights', description:'Two streetlights near the bus stop are not working after sunset.', category:'broken_streetlight', severity:'medium', priority_score:69,
    suggested_department:'Electricity Department', ai_summary:'Repeated streetlight failure is reducing night visibility around a transit stop.', status:'reported', photo_url:'/demo-issues/broken-streetlight.jpg', after_repair_photo_url:null,
    latitude:17.47654, longitude:78.44905, location_text:'Balanagar, Hyderabad', area:'Balanagar', supporters:['lb1','lb2','lb3'], assigned_to:null, duplicate_of:null, created_at:daysAgo(11), updated_at:now()
  },
  {
    id:'cmp-hot-b6', user_id:'citizen-arjun', reporter_name:'Arjun', title:'Road surface broken near industrial gate', description:'The road surface has cracked and sunk across a large patch.', category:'damaged_road', severity:'high', priority_score:81,
    suggested_department:'Roads Department', ai_summary:'Damaged road surface is worsening under heavy vehicle traffic.', status:'verified', photo_url:'/demo-issues/damaged-road.jpg', after_repair_photo_url:null,
    latitude:17.47565, longitude:78.44745, location_text:'Balanagar, Hyderabad', area:'Balanagar', supporters:['rb1','rb2','rb3','rb4','rb5','rb6'], assigned_to:null, duplicate_of:null, created_at:daysAgo(8), updated_at:now()
  },
  {
    id:'cmp-hot-b7', user_id:'citizen-sana', reporter_name:'Sana', title:'Open manhole near pedestrian crossing', description:'The manhole lid is missing close to a busy crossing.', category:'open_manhole', severity:'critical', priority_score:96,
    suggested_department:'Drainage & Sewerage', ai_summary:'Open manhole creates an immediate fall hazard for pedestrians and riders.', status:'reported', photo_url:'/demo-issues/open-manhole.jpg', after_repair_photo_url:null,
    latitude:17.47702, longitude:78.44934, location_text:'Balanagar, Hyderabad', area:'Balanagar', supporters:['mb1','mb2','mb3','mb4','mb5','mb6','mb7','mb8'], assigned_to:null, duplicate_of:null, created_at:daysAgo(10), updated_at:now()
  },
  {
    id:'cmp-hot-k1', user_id:'citizen-neha', reporter_name:'Neha', title:'Potholes near Kukatpally junction', description:'Several potholes have formed along the junction approach.', category:'pothole', severity:'high', priority_score:83,
    suggested_department:'Roads Department', ai_summary:'Multiple potholes are affecting traffic movement near a busy junction.', status:'reported', photo_url:'/demo-issues/pothole.jpg', after_repair_photo_url:null,
    latitude:17.49362, longitude:78.39862, location_text:'Kukatpally, Hyderabad', area:'Kukatpally', supporters:['kp1','kp2','kp3','kp4','kp5'], assigned_to:null, duplicate_of:null, created_at:daysAgo(4), updated_at:now()
  },
  {
    id:'cmp-hot-k2', user_id:'citizen-arjun', reporter_name:'Arjun', title:'Garbage overflowing near market entrance', description:'Waste has overflowed from the collection point into the road.', category:'garbage', severity:'medium', priority_score:70,
    suggested_department:'Sanitation & Waste Management', ai_summary:'Overflowing garbage collection point requires cleanup and collection scheduling.', status:'assigned', photo_url:'/demo-issues/garbage.jpg', after_repair_photo_url:null,
    latitude:17.49276, longitude:78.39954, location_text:'Kukatpally, Hyderabad', area:'Kukatpally', supporters:['kg1','kg2','kg3'], assigned_to:'Sanitation Team 5', duplicate_of:null, created_at:daysAgo(6), updated_at:now()
  },
  {
    id:'cmp-hot-k3', user_id:'citizen-sana', reporter_name:'Sana', title:'Drain overflow after rain', description:'A blocked drain is overflowing and spreading dirty water across the lane.', category:'drainage', severity:'high', priority_score:84,
    suggested_department:'Drainage & Sewerage', ai_summary:'Blocked drainage is causing wastewater overflow after rainfall.', status:'verified', photo_url:'/demo-issues/drainage.jpg', after_repair_photo_url:null,
    latitude:17.49305, longitude:78.40012, location_text:'Kukatpally, Hyderabad', area:'Kukatpally', supporters:['kd1','kd2','kd3','kd4','kd5'], assigned_to:null, duplicate_of:null, created_at:daysAgo(6), updated_at:now()
  },
  {
    id:'cmp-hot-k4', user_id:'citizen-demo', reporter_name:'Demo Citizen', title:'Broken streetlight at bus bay', description:'The streetlight at the bus bay remains off at night.', category:'broken_streetlight', severity:'medium', priority_score:62,
    suggested_department:'Electricity Department', ai_summary:'Dark bus bay reduces pedestrian visibility and safety at night.', status:'in_progress', photo_url:'/demo-issues/broken-streetlight.jpg', after_repair_photo_url:null,
    latitude:17.49418, longitude:78.39974, location_text:'Kukatpally, Hyderabad', area:'Kukatpally', supporters:['kl1','kl2'], assigned_to:'Electrical Team 2', duplicate_of:null, created_at:daysAgo(2), updated_at:now()
  },
  {
    id:'cmp-hot-m1', user_id:'citizen-demo', reporter_name:'Demo Citizen', title:'Open drain beside tech park lane', description:'The roadside drain is uncovered and partially blocked by debris.', category:'drainage', severity:'high', priority_score:82,
    suggested_department:'Drainage & Sewerage', ai_summary:'Uncovered drainage beside a high-footfall lane presents safety and sanitation risks.', status:'reported', photo_url:'/demo-issues/drainage.jpg', after_repair_photo_url:null,
    latitude:17.44685, longitude:78.37552, location_text:'Madhapur, Hyderabad', area:'Madhapur', supporters:['md1','md2','md3','md4'], assigned_to:null, duplicate_of:null, created_at:daysAgo(4), updated_at:now()
  },
  {
    id:'cmp-hot-m2', user_id:'citizen-neha', reporter_name:'Neha', title:'Water leak beside office street', description:'Water is leaking from a pipe joint and collecting beside the curb.', category:'water_leakage', severity:'medium', priority_score:72,
    suggested_department:'Water Works Department', ai_summary:'Pipeline leak is creating stagnant water beside the office road.', status:'verified', photo_url:'/demo-issues/water-leakage.jpg', after_repair_photo_url:null,
    latitude:17.44712, longitude:78.37668, location_text:'Madhapur, Hyderabad', area:'Madhapur', supporters:['mw1','mw2','mw3'], assigned_to:null, duplicate_of:null, created_at:daysAgo(3), updated_at:now()
  },
  {
    id:'cmp-hot-m3', user_id:'citizen-arjun', reporter_name:'Arjun', title:'Damaged road beside flyover', description:'The top road layer is broken and uneven beside the flyover ramp.', category:'damaged_road', severity:'high', priority_score:80,
    suggested_department:'Roads Department', ai_summary:'Damaged road surface beside the flyover may worsen with traffic load.', status:'assigned', photo_url:'/demo-issues/damaged-road.jpg', after_repair_photo_url:null,
    latitude:17.44802, longitude:78.37605, location_text:'Madhapur, Hyderabad', area:'Madhapur', supporters:['mr1','mr2','mr3','mr4'], assigned_to:'Road Repair Team 6', duplicate_of:null, created_at:daysAgo(7), updated_at:now()
  },
  {
    id:'cmp-hot-m4', user_id:'citizen-sana', reporter_name:'Sana', title:'Open manhole on service road', description:'A manhole cover is displaced on the service road near offices.', category:'open_manhole', severity:'critical', priority_score:93,
    suggested_department:'Drainage & Sewerage', ai_summary:'Displaced manhole cover creates a serious traffic and pedestrian hazard.', status:'in_progress', photo_url:'/demo-issues/open-manhole.jpg', after_repair_photo_url:null,
    latitude:17.44642, longitude:78.37708, location_text:'Madhapur, Hyderabad', area:'Madhapur', supporters:['mm1','mm2','mm3','mm4','mm5','mm6'], assigned_to:'Drainage Emergency Team 1', duplicate_of:null, created_at:daysAgo(2), updated_at:now()
  },

  // Demo duplicate reports are intentionally spread across the city so the authority map can demonstrate grouping and de-duplication.
  { id:'cmp-dup-b-p1', user_id:'citizen-neha', reporter_name:'Neha', title:'Same deep pothole beside Balanagar Metro pillar', description:'The pothole beside the metro approach is still open and vehicles are swerving around it.', category:'pothole', severity:'high', priority_score:79, suggested_department:'Roads Department', ai_summary:'Likely duplicate of the Balanagar Metro pothole report.', status:'reported', photo_url:'/demo-issues/pothole.jpg', after_repair_photo_url:null, latitude:17.47678, longitude:78.44822, location_text:'Balanagar Metro, Hyderabad', area:'Balanagar', supporters:['dbp1','dbp2','dbp3'], assigned_to:null, duplicate_of:'cmp-demo-4', created_at:daysAgo(2), updated_at:now() },
  { id:'cmp-dup-b-p2', user_id:'citizen-sana', reporter_name:'Sana', title:'Pothole still blocking Balanagar service lane', description:'Another resident report of the same large pothole near the metro entrance.', category:'pothole', severity:'high', priority_score:77, suggested_department:'Roads Department', ai_summary:'Second likely duplicate of the Balanagar Metro pothole cluster.', status:'reported', photo_url:'/demo-issues/pothole.jpg', after_repair_photo_url:null, latitude:17.47686, longitude:78.44812, location_text:'Balanagar Metro, Hyderabad', area:'Balanagar', supporters:['dbp4','dbp5'], assigned_to:null, duplicate_of:'cmp-demo-4', created_at:daysAgo(1), updated_at:now() },
  { id:'cmp-dup-b-d1', user_id:'citizen-demo', reporter_name:'Demo Citizen', title:'Open drain beside Balanagar school still unsafe', description:'The same uncovered drainage channel is still open beside the school road.', category:'drainage', severity:'high', priority_score:86, suggested_department:'Drainage & Sewerage', ai_summary:'Duplicate report of the open drainage safety issue near the school.', status:'reported', photo_url:'/demo-issues/drainage.jpg', after_repair_photo_url:null, latitude:17.47618, longitude:78.44780, location_text:'Balanagar, Hyderabad', area:'Balanagar', supporters:['dbd1','dbd2','dbd3','dbd4'], assigned_to:null, duplicate_of:'cmp-hot-b1', created_at:daysAgo(5), updated_at:now() },
  { id:'cmp-dup-b-m1', user_id:'citizen-arjun', reporter_name:'Arjun', title:'Missing manhole cover near Balanagar crossing', description:'Citizen confirms the same open manhole near the pedestrian crossing.', category:'open_manhole', severity:'critical', priority_score:95, suggested_department:'Drainage & Sewerage', ai_summary:'Duplicate report confirming the open manhole hazard.', status:'reported', photo_url:'/demo-issues/open-manhole.jpg', after_repair_photo_url:null, latitude:17.47708, longitude:78.44928, location_text:'Balanagar, Hyderabad', area:'Balanagar', supporters:['dbm1','dbm2','dbm3'], assigned_to:null, duplicate_of:'cmp-hot-b7', created_at:daysAgo(6), updated_at:now() },
  { id:'cmp-dup-k-p1', user_id:'citizen-sana', reporter_name:'Sana', title:'Repeated pothole complaint at Kukatpally junction', description:'The same potholes at the junction approach are causing two-wheelers to brake suddenly.', category:'pothole', severity:'high', priority_score:81, suggested_department:'Roads Department', ai_summary:'Likely duplicate of the Kukatpally junction pothole report.', status:'reported', photo_url:'/demo-issues/pothole.jpg', after_repair_photo_url:null, latitude:17.49355, longitude:78.39870, location_text:'Kukatpally, Hyderabad', area:'Kukatpally', supporters:['dkp1','dkp2'], assigned_to:null, duplicate_of:'cmp-hot-k1', created_at:daysAgo(3), updated_at:now() },
  { id:'cmp-dup-k-p2', user_id:'citizen-demo', reporter_name:'Demo Citizen', title:'Potholes remain at Kukatpally junction entrance', description:'A second nearby citizen has reported the same pothole cluster.', category:'pothole', severity:'medium', priority_score:75, suggested_department:'Roads Department', ai_summary:'Duplicate report in the Kukatpally pothole cluster.', status:'verified', photo_url:'/demo-issues/pothole.jpg', after_repair_photo_url:null, latitude:17.49372, longitude:78.39853, location_text:'Kukatpally, Hyderabad', area:'Kukatpally', supporters:['dkp3','dkp4','dkp5'], assigned_to:null, duplicate_of:'cmp-hot-k1', created_at:daysAgo(2), updated_at:now() },
  { id:'cmp-dup-k-d1', user_id:'citizen-neha', reporter_name:'Neha', title:'Same drain overflowing near Kukatpally lane', description:'Overflow from the same blocked drain continues after rainfall.', category:'drainage', severity:'high', priority_score:82, suggested_department:'Drainage & Sewerage', ai_summary:'Duplicate report confirming continuing drain overflow.', status:'reported', photo_url:'/demo-issues/drainage.jpg', after_repair_photo_url:null, latitude:17.49312, longitude:78.40003, location_text:'Kukatpally, Hyderabad', area:'Kukatpally', supporters:['dkd1','dkd2','dkd3'], assigned_to:null, duplicate_of:'cmp-hot-k3', created_at:daysAgo(4), updated_at:now() },
  { id:'cmp-dup-k-w1', user_id:'citizen-arjun', reporter_name:'Arjun', title:'Pipeline leak still flooding Kukatpally road edge', description:'A second report confirms the same water pipe leak on the main street.', category:'water_leakage', severity:'high', priority_score:78, suggested_department:'Water Works Department', ai_summary:'Duplicate of the active Kukatpally water leakage complaint.', status:'in_progress', photo_url:'/demo-issues/water-leakage.jpg', after_repair_photo_url:null, latitude:17.49328, longitude:78.39918, location_text:'Kukatpally, Hyderabad', area:'Kukatpally', supporters:['dkw1','dkw2'], assigned_to:'Water Works Team 1', duplicate_of:'cmp-demo-7', created_at:daysAgo(1), updated_at:now() },
  { id:'cmp-dup-m-d1', user_id:'citizen-sana', reporter_name:'Sana', title:'Open drain repeated near Madhapur tech park', description:'The same roadside open drain is still exposed near the tech park lane.', category:'drainage', severity:'high', priority_score:80, suggested_department:'Drainage & Sewerage', ai_summary:'Duplicate of the Madhapur open-drain complaint.', status:'reported', photo_url:'/demo-issues/drainage.jpg', after_repair_photo_url:null, latitude:17.44691, longitude:78.37561, location_text:'Madhapur, Hyderabad', area:'Madhapur', supporters:['dmd1','dmd2','dmd3'], assigned_to:null, duplicate_of:'cmp-hot-m1', created_at:daysAgo(2), updated_at:now() },
  { id:'cmp-dup-m-w1', user_id:'citizen-neha', reporter_name:'Neha', title:'Same water leak reported by nearby office', description:'Water continues to collect beside the curb from the same leaking pipe joint.', category:'water_leakage', severity:'medium', priority_score:70, suggested_department:'Water Works Department', ai_summary:'Duplicate of the Madhapur office-street water leak.', status:'verified', photo_url:'/demo-issues/water-leakage.jpg', after_repair_photo_url:null, latitude:17.44719, longitude:78.37673, location_text:'Madhapur, Hyderabad', area:'Madhapur', supporters:['dmw1','dmw2'], assigned_to:null, duplicate_of:'cmp-hot-m2', created_at:daysAgo(1), updated_at:now() },
  { id:'cmp-dup-a-l1', user_id:'citizen-demo', reporter_name:'Demo Citizen', title:'Streetlight outage reported again in Ameerpet lane', description:'Residents confirm the same streetlight is still not working after several nights.', category:'broken_streetlight', severity:'medium', priority_score:60, suggested_department:'Electricity Department', ai_summary:'Duplicate confirmation of the Ameerpet streetlight outage.', status:'reported', photo_url:'/demo-issues/broken-streetlight.jpg', after_repair_photo_url:null, latitude:17.43766, longitude:78.44835, location_text:'Ameerpet, Hyderabad', area:'Ameerpet', supporters:['dal1','dal2','dal3'], assigned_to:null, duplicate_of:'cmp-demo-6', created_at:daysAgo(3), updated_at:now() },
  { id:'cmp-dup-s-m1', user_id:'citizen-arjun', reporter_name:'Arjun', title:'Open manhole still exposed near Secunderabad bus stop', description:'Another commuter has reported the same missing manhole cover.', category:'open_manhole', severity:'critical', priority_score:93, suggested_department:'Drainage & Sewerage', ai_summary:'Duplicate confirmation of the Secunderabad open manhole hazard.', status:'reported', photo_url:'/demo-issues/open-manhole.jpg', after_repair_photo_url:null, latitude:17.43997, longitude:78.49824, location_text:'Secunderabad, Hyderabad', area:'Secunderabad', supporters:['dsm1','dsm2','dsm3','dsm4'], assigned_to:null, duplicate_of:'cmp-demo-8', created_at:daysAgo(2), updated_at:now() },
  { id:'cmp-dup-h-p1', user_id:'citizen-sana', reporter_name:'Sana', title:'Cyber Towers pothole reported by second commuter', description:'The same deep pothole near Cyber Towers is forcing vehicles into the next lane.', category:'pothole', severity:'high', priority_score:84, suggested_department:'Roads Department', ai_summary:'Duplicate report for the Cyber Towers pothole.', status:'in_progress', photo_url:'/demo-issues/pothole.jpg', after_repair_photo_url:null, latitude:17.44857, longitude:78.37428, location_text:'HITEC City, Hyderabad', area:'HITEC City', supporters:['dhp1','dhp2'], assigned_to:'Road Repair Team 4', duplicate_of:'cmp-demo-1', created_at:daysAgo(1), updated_at:now() },
  { id:'cmp-dup-h-e1', user_id:'citizen-neha', reporter_name:'Neha', title:'Low electric wire near HITEC school reported again', description:'A second citizen confirms the same low-hanging electric wire near the school gate.', category:'loose_electric_wire', severity:'critical', priority_score:96, suggested_department:'Electricity Department', ai_summary:'Duplicate confirmation of a critical low-hanging electrical wire.', status:'verified', photo_url:'/demo-issues/loose-electric-wire.jpg', after_repair_photo_url:null, latitude:17.45013, longitude:78.37298, location_text:'HITEC City, Hyderabad', area:'HITEC City', supporters:['dhe1','dhe2','dhe3'], assigned_to:null, duplicate_of:'cmp-demo-3', created_at:daysAgo(2), updated_at:now() },
  { id:'cmp-dup-moo-r1', user_id:'citizen-demo', reporter_name:'Demo Citizen', title:'Road surface again damaged near Moosapet market', description:'A nearby section of the same damaged market road has broken again after heavy traffic.', category:'damaged_road', severity:'medium', priority_score:68, suggested_department:'Roads Department', ai_summary:'Related duplicate report in the Moosapet damaged-road cluster.', status:'reported', photo_url:'/demo-issues/damaged-road.jpg', after_repair_photo_url:null, latitude:17.48418, longitude:78.41378, location_text:'Moosapet, Hyderabad', area:'Moosapet', supporters:['dmr1','dmr2','dmr3'], assigned_to:null, duplicate_of:'cmp-demo-10', created_at:daysAgo(4), updated_at:now() }
];

let users = [...demoUsers];
let complaints = [...baseComplaints];

function areaFromLocation(locationText) {
  if (!locationText) return 'Other Area';
  return String(locationText).split(',')[0].trim() || 'Other Area';
}

function shapeComplaint(c) {
  const plain = c?.toJSON ? c.toJSON() : { ...c };
  const reporter = users.find(u => u.id === plain.user_id);
  plain.supporter_count = plain.supporters?.length || plain.supporter_count || 0;
  plain.area = plain.area || areaFromLocation(plain.location_text);
  plain.duplicate_of = plain.duplicate_of || null;
  plain.profiles = plain.profiles || { id: plain.user_id, full_name: plain.reporter_name || reporter?.full_name || 'Citizen', role: 'citizen', department: null, created_at: plain.created_at };
  return plain;
}

export async function findUserByEmail(email) {
  if (isMongoConnected()) return User.findOne({ email: email.toLowerCase() });
  return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
}

export async function findUserById(id) {
  if (isMongoConnected()) return User.findById(id);
  return users.find(u => u.id === id) || null;
}

export async function createUser({ full_name, email, password, role = 'citizen', department = null }) {
  if (isMongoConnected()) {
    const password_hash = await bcrypt.hash(password, 10);
    return User.create({ full_name, email, password_hash, role, department });
  }
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) throw new Error('An account with this email already exists.');
  const user = { id: randomUUID(), full_name, email: email.toLowerCase(), password, role, department, created_at: now() };
  users.push(user);
  return user;
}

export async function verifyPassword(user, password) {
  if (!user) return false;
  if (isMongoConnected()) return bcrypt.compare(password, user.password_hash);
  return user.password === password;
}

export async function listComplaints(filters = {}) {
  if (isMongoConnected()) {
    const query = {};
    if (filters.status) query.status = filters.status;
    if (filters.category) query.category = filters.category;
    if (filters.severity) query.severity = filters.severity;
    const docs = await Complaint.find(query).sort({ created_at: -1 });
    return docs.map(shapeComplaint);
  }
  let result = complaints.map(shapeComplaint);
  if (filters.status) result = result.filter(c => c.status === filters.status);
  if (filters.category) result = result.filter(c => c.category === filters.category);
  if (filters.severity) result = result.filter(c => c.severity === filters.severity);
  return result.sort((a,b) => new Date(b.created_at)-new Date(a.created_at));
}

export async function getComplaint(id) {
  if (isMongoConnected()) {
    const doc = await Complaint.findById(id);
    return doc ? shapeComplaint(doc) : null;
  }
  const c = complaints.find(c => c.id === id);
  return c ? shapeComplaint(c) : null;
}

export async function createComplaint(data) {
  const normalized = { ...data, area: data.area || areaFromLocation(data.location_text), duplicate_of: data.duplicate_of || null };
  if (isMongoConnected()) {
    const reporter = await findUserById(normalized.user_id);
    const doc = await Complaint.create({ ...normalized, reporter_name: reporter?.full_name || 'Citizen' });
    return shapeComplaint(doc);
  }
  const reporter = users.find(u => u.id === normalized.user_id);
  const c = { id: randomUUID(), ...normalized, reporter_name: reporter?.full_name || 'Citizen', supporters: [], assigned_to: null, status: normalized.status || 'reported', created_at: now(), updated_at: now() };
  complaints.unshift(c);
  return shapeComplaint(c);
}

export async function updateComplaint(id, update) {
  if (isMongoConnected()) {
    const doc = await Complaint.findByIdAndUpdate(id, update, { new: true });
    return doc ? shapeComplaint(doc) : null;
  }
  const idx = complaints.findIndex(c => c.id === id);
  if (idx < 0) return null;
  complaints[idx] = { ...complaints[idx], ...update, updated_at: now() };
  return shapeComplaint(complaints[idx]);
}

export async function toggleComplaintSupport(id, userId) {
  if (isMongoConnected()) {
    const doc = await Complaint.findById(id);
    if (!doc) return null;
    const i = doc.supporters.indexOf(userId);
    const supported = i < 0;
    if (supported) doc.supporters.push(userId); else doc.supporters.splice(i, 1);
    doc.priority_score = Math.max(0, Math.min(100, doc.priority_score + (supported ? 2 : -2)));
    await doc.save();
    return { supported, complaint: shapeComplaint(doc) };
  }
  const c = complaints.find(c => c.id === id);
  if (!c) return null;
  const i = c.supporters.indexOf(userId);
  const supported = i < 0;
  if (supported) c.supporters.push(userId); else c.supporters.splice(i,1);
  c.priority_score = Math.max(0, Math.min(100, c.priority_score + (supported ? 2 : -2)));
  c.updated_at = now();
  return { supported, complaint: shapeComplaint(c) };
}

export async function getSupportInfo(id, userId) {
  const c = await getComplaint(id);
  if (!c) return { count: 0, supported: false };
  return { count: c.supporter_count || 0, supported: !!(userId && c.supporters?.includes(userId)) };
}

export function resetMemoryStore() {
  users = [...demoUsers];
  complaints = [...baseComplaints];
}
