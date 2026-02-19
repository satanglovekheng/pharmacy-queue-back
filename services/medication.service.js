const pool = require("../config/db");

async function createMedication(data) {
  const { hn, patient_name, drug_list, room_id } = data;

  const [result] = await pool.query(
    "INSERT INTO medication_queue (hn, patient_name, drug_list, room_id) VALUES (?,?,?,?)",
    [hn, patient_name, drug_list, room_id]
  );

  return result.insertId;
}

async function getPending(room_id) {
  const [rows] = await pool.query(
    "SELECT * FROM medication_queue WHERE status='pending' AND room_id=? ORDER BY created_at ASC",
    [room_id]
  );
  return rows;
}

async function getCompletedToday(room_id) {
  const [rows] = await pool.query(
    `SELECT * FROM medication_queue
     WHERE status='completed'
     AND room_id=?
     AND DATE(completed_at)=CURDATE()
     ORDER BY completed_at DESC`,
    [room_id]
  );
  return rows;
}

async function completeMedication(id) {
  await pool.query(
    "UPDATE medication_queue SET status='completed', completed_at=NOW() WHERE id=?",
    [id]
  );
}


module.exports = {
  createMedication,
  getPending,
  getCompletedToday,
  completeMedication,
};
