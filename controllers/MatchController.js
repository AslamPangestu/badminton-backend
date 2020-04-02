const Model = require("../models/Match");
const ModelName = "pertandingan";

const FindOne = async id => await Model.findOne({ _id: id });

const GetAll = async (req, res, next) => {
  const { player, referee } = req.query;
  let message, data;
  if (referee !== undefined) {
    data = await Model.find({ referee })
      .populate("referee")
      .populate("players_team1")
      .populate("players_team2");
    message = `Semua data ${ModelName} berdasarkan wasit ${referee}`;
  } else if (player !== undefined) {
    data = await Model.find({
      $or: [{ players_team1: player }, { players_team2: player }]
    })
      .populate("referee")
      .populate("players_team1")
      .populate("players_team2");
    message = `Semua data ${ModelName} berdasarkan pemain ${player}`;
  } else {
    data = await Model.find().populate("referee");
    message = `Semua data ${ModelName}`;
  }
  res.status(200).json({
    status: true,
    message,
    data
  });
};

const GetDetail = async (req, res, next) => {
  const { id } = req.params;
  const data = await Model.findOne({ _id: id })
    .populate("referee")
    .populate("players_team1")
    .populate("players_team2");
  res.status(200).json({
    status: true,
    message: `Data ${ModelName} ${data.name}`,
    data
  });
};

const Create = async (req, res, next) => {
  const {
    name,
    is_single,
    referee,
    location,
    players_team1,
    players_team2
  } = req.body;
  await Model.create({
    name,
    is_single,
    referee,
    location,
    players_team1,
    players_team2
  });
  res.status(200).json({
    status: true,
    message: `Berhasil menambah data ${ModelName} ${name}`
  });
};

const Update = async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    is_single,
    referee,
    players_team1,
    players_team2,
    location
  } = req.body;
  let data = await FindOne(id);
  data.name = name;
  data.is_single = is_single;
  data.referee = referee;
  data.players_team1 = players_team1;
  data.players_team2 = players_team2;
  data.location = location;
  await data.save();
  res.status(200).json({
    status: true,
    message: `Berhasil mengubah data ${ModelName} ${data.name}`
  });
};

const SaveSets = async () => {
  const { id } = req.params;
  const { set, result } = req.body;
  let data = await FindOne(id);
  switch (set) {
    case 1:
      data.set1 = result;
      break;
    case 2:
      data.set2 = result;
      break;
    default:
      data.set3 = result;
      break;
  }
  await data.save();
  res.status(200).json({
    status: true,
    message: `Berhasil menyimpan Set ${set} pada pertandingan ${data.name}`
  });
};

const Delete = async (req, res, next) => {
  const { id } = req.params;
  const data = await FindOne(id);
  await data.remove();
  res.status(200).json({
    status: true,
    message: `Berhasil menghapus data ${ModelName} ${data.name}`
  });
};

module.exports = {
  GetAll,
  GetDetail,
  Create,
  Update,
  Delete
};
