const express = require("express");
const router = express.Router();
const Video = require("../models/Video");

router.get("/", (req, res) => {
  /*
  more i would build:
  - is this user logged in?
  - do they have the permission to view this page?
  - if not redirect them to another page, maybe alert them they don't have permission
  */

  try {
    Video.find()
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(500).send(err.message));
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/:id", (req, res) => {
  try {
    const id = req.params.id;

    Video.findOne({ _id: id })
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(500).send(err.message));
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/", (req, res) => {
  //would need to make sure it's actually a video file here first

  try {
    Video.create(req.body, function (err, response) {
      if (err) {
        res.status(500).send("Internal server error.");
      } else {
        res.status(200).send(response);
      }
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put("/:id", (req, res) => {
  try {
    const id = req.params.id;

    Video.updateOne({ _id: id }, req.body, function (err, response) {
      if (err) {
        res.status(500).send("Internal server error.");
      } else {
        res.status(200).send(response);
      }
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/:id", (req, res) => {
  try {
    const id = req.params.id;

    Video.deleteOne({ _id: id }, req.body, function (err, response) {
      if (err) {
        res.status(400).send("Internal server error.");
      } else {
        res.status(200);
      }
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
