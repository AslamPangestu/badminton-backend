const Model = require("../models/Player");
const ModelName = "player";

const FindOne = async id => await Model.findOne({ _id: id });

const GetAll = async (req, res, next) => {
  const data = await Model.find();
  res.status(200).json({
    status: true,
    message: `Semua data ${ModelName}`,
    data
  });
};

const GetDetail = async (req, res, next) => {
  const { id } = req.params;
  const data = await FindOne(id);
  res.status(200).json({
    status: true,
    message: `Data ${ModelName} ${data.nickname}`,
    data
  });
};

const Create = async (req, res, next) => {
  const { fullname, nickname, phone, gender } = req.body;
  await Model.create({
    fullname,
    nickname,
    phone,
    gender
  });
  res.status(200).json({
    status: true,
    message: `Berhasil menambah data ${ModelName} ${nickname}`
  });
};

const Update = async (req, res, next) => {
  const { id } = req.params;
  const { fullname, nickname, phone, gender } = req.body;
  let data = await FindOne(id);
  data.fullname = fullname;
  data.nickname = nickname;
  data.phone = phone;
  data.gender = gender;
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
