export async function notifyStatusChange(complaint) {
  console.log(`[notification demo] Complaint ${complaint.id || complaint._id} is now ${complaint.status}`);
}
