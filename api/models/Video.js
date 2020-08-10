const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      label: "title",
      required: [true, "Title required"],
    },
  },
  {
    collection: "Video",
  }
);

module.exports = mongoose.model("Video", schema);
