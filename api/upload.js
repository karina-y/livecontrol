const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const fetch = require("node-fetch");

const args = process.argv.slice(2);
const videoPath = args[0];
const videoTitle = args[1];

//first function that runs is addToDb() at the end of the file

//this is to keep track of the percentage we're at, don't want to show the same number more than once
let percentComplete = 0;

//check our arguments
if (!videoPath) {
  console.log("Please provide a video.");
  process.exit();
} else if (!videoTitle) {
  console.log("Please provide a title for your video.");
  process.exit();
}

const convertResolutions = (basePath) => {
  // read the file
  ffmpeg(videoPath)
    //240p
    .output(`${basePath}/240.mp4`)
    .videoCodec("libx264")
    .size("352x240")

    //480p
    .output(`${basePath}/480.mp4`)
    .videoCodec("libx264")
    .size("858x480")

    //1080p
    .output(`${basePath}/1080.mp4`)
    .videoCodec("libx264")
    .size("1920x1080")

    //2160p
    .output(`${basePath}/2160.mp4`)
    .videoCodec("libx264")
    .size("3860x2160")

    .on("error", function (err) {
      console.log("An error occurred:", err.message);
      process.exit();
    })
    //let the user know where we're at
    .on("progress", function (progress) {
      let completed = Math.round(progress.percent);

      if (progress.percent >= 1) {
        //the user doesn't need to see every decimal between 1 and 100...
        if (percentComplete < completed) {
          percentComplete = completed;
          console.log("Processing:", completed, "% done");
        }
      } else {
        console.log(
          "Processing:",
          Math.round(progress.percent * 100) / 100,
          "% done"
        );
      }
    })
    .on("end", function () {
      console.log("Finished processing videos.");
    })
    .run();
};

const getScreenshot = (basePath) => {
  //need to create thumbnail separately
  //(.screenshots only converts the video at the point of screenshot and runs very slow, output png crashes the conversion at the point of thumbnail)
  ffmpeg(videoPath)
    .screenshots({
      timestamps: ["00:15"],
      filename: "thumbnail.png",
      folder: basePath,
      size: "320x240",
    })

    .on("error", function (err) {
      console.log("An error occurred generating thumbnail:", err.message);
      process.exit();
    })
    //let the user know where we're at
    .on("progress", function (progress) {
      // console.log("Generating thumbnail...")
    })
    .on("end", function () {
      console.log("Finished generating thumbnail.");
      convertResolutions(basePath);
    });
};

const createDirectory = (id) => {
  //create the new directory
  const videosDir = "../client/public/videos/";
  const basePath = `${videosDir}${id}`;

  //first check if we have a videos directory yet, if not create it
  if (!fs.existsSync(videosDir)) {
    fs.mkdirSync(videosDir);
  }

  fs.mkdir(basePath, function (err) {
    if (err) {
      console.log(
        "There was a problem creating the video directory",
        err.message
      );
      process.exit();
    } else {
      console.log("New directory successfully created.");
      getScreenshot(basePath);
    }
  });
};

const addToDb = () => {
  const data = {
    title: videoTitle,
  };

  fetch("http://localhost:8080/api/video", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.text())
    .then((res) => createDirectory(JSON.parse(res)._id))
    .catch((err) => {
      //since this is a script i'm inclined to send status updates, if this was in a gui i'd have a progress bar
      console.log("Error saving video data", err.message);
    });
};

addToDb();
