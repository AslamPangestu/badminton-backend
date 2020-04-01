const Model = require("../models/Presence");
const ModelName = "kehadiran";

const FindOne = async id => await Model.findOne({ _id: id });

const GetAll = async (req, res, next) => {
  const data = await Model.find().select("date");
  res.status(200).json({
    status: true,
    message: `Semua data ${ModelName}`,
    data
  });
};

const GetDetail = async (req, res, next) => {
  const { id } = req.params;
  const data = await Model.findOne({ _id: id }).populate("players._id");
  res.status(200).json({
    status: true,
    message: `Data ${ModelName} tanggal ${data.date}`,
    data
  });
};

const Create = async (req, res, next) => {
  const { date } = req.body;
  const data = await Model.create({
    date
  });
  res.status(200).json({
    status: true,
    message: `Berhasil menambah data ${ModelName} tanggal ${data.date}`
  });
};

const Update = async (req, res, next) => {
  const { id } = req.params;
  const { date, players } = req.body;
  let data = await FindOne(id);
  data.date = date;
  data.players = players;
  await data.save();
  res.status(200).json({
    status: true,
    message: `Berhasil mengubah data ${ModelName} tanggal ${data.date}`
  });
};

const Delete = async (req, res, next) => {
  const { id } = req.params;
  const data = await FindOne(id);
  await data.remove();
  res.status(200).json({
    status: true,
    message: `Berhasil menghapus data ${ModelName} tanggal ${data.date}`
  });
};

module.exports = { GetAll, GetDetail, Create, Update, Delete };
