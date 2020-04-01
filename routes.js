const express = require("express");
const PlayerController = require("./controllers/PlayerController"),
  PresenceController = require("./controllers/PresenceController"),
  MatchController = require("./controllers/MatchController");

const app = express();

//Player Route
app
  .route("/players")
  .get(PlayerController.GetAll)
  .post(PlayerController.Create);
app
  .route("/players/:id")
  .get(PlayerController.GetDetail)
  .patch(PlayerController.Update)
  .delete(PlayerController.Delete);

//Presence Route
app
  .route("/presences")
  .get(PresenceController.GetAll)
  .post(PresenceController.Create);
app
  .route("/presences/:id")
  .get(PresenceController.GetDetail)
  .patch(PresenceController.Update)
  .delete(PresenceController.Delete);

//Match Route
app
  .route("/matches")
  .get(MatchController.GetAll)
  .post(MatchController.Create);
app
  .route("/matches/:id")
  .get(MatchController.GetDetail)
  .patch(MatchController.Update)
  .delete(MatchController.Delete);

module.exports = app;
