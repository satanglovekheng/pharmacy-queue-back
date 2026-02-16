const pool = require("../config/db");

async function createMedication(data) {
    const { hn, patient_name, drug_list, room_id } = req.body;

    const [result] = await pool.query(
      "INSERT INTO medication_queue (hn, patient_name, drug_list, room_id) VALUES (?,?,?,?)",
      [hn, patient_name, drug_list, room_id]
    );

  return result.insertId;
}

async function getPending() {
  const [rows] = await pool.query(
    "SELECT * FROM medication_queue WHERE status='pending' ORDER BY created_at ASC"
  );
  return rows;
}

async function getCompletedToday() {
  const [rows] = await pool.query(
    `SELECT * FROM medication_queue
     WHERE status='completed'
     AND DATE(completed_at)=CURDATE()
     ORDER BY completed_at DESC`
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
