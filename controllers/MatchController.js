const Model = require("../models/Match");
const ModelName = "pertandingan";

const FindOne = async id => await Model.findOne({ _id: id });

const GetAll = async (req, res, next) => {
  const data = await Model.find().populate("refree");
  res.status(200).json({
    status: true,
    message: `Semua data ${ModelName}`,
    data
  });
};

const GetDetail = async (req, res, next) => {
  const { id } = req.params;
  const data = await Model.findOne({ _id: id })
    .populate("refree")
    .populate("players_team1")
    .populate("players_team2");
  res.status(200).json({
    status: true,
    message: `Data ${ModelName} ${data.name}`,
    data
  });
};

const Create = async (req, res, next) => {
  const { name, is_single, refree, location } = req.body;
  await Model.create({
    name,
    is_single,
    refree,
    location
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
    refree,
    players_team1,
    players_team2,
    sets,
    location
  } = req.body;
  let data = await FindOne(id);
  data.name = name;
  data.is_single = is_single;
  data.refree = refree;
  data.players_team1 = players_team1;
  data.players_team2 = players_team2;
  data.sets = sets;
  data.location = location;
  await data.save();
  res.status(200).json({
    status: true,
    message: `Berhasil mengubah data ${ModelName} ${data.nickname}`
  });
};

const Delete = async (req, res, next) => {
  const { id } = req.params;
  const data = await FindOne(id);
  await data.remove();
  res.status(200).json({
    status: true,
    message: `Berhasil menghapus data ${ModelName} ${data.nickname}`
  });
};

module.exports = { GetAll, GetDetail, Create, Update, Delete };
