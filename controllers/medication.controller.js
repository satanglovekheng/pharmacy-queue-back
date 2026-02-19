const service = require("../services/medication.service");
const { getIO } = require("../socket/socket");

async function create(req, res) {
  const id = await service.createMedication(req.body);

  getIO().emit("queueUpdated");

  res.json({ success: true, id });
}

async function pending(req, res) {
  const { room_id } = req.query;
  const data = await service.getPending(room_id);
  res.json(data);
}


async function completedToday(req, res) {
  const { room_id } = req.query;
  const data = await service.getCompletedToday(room_id);
  res.json(data);
}

async function complete(req, res) {

  await service.completeMedication(req.params.id);

  getIO().emit("queueUpdated");

  res.json({ success: true });
}

module.exports = {
  create,
  pending,
  completedToday,
  complete,
};
