import React from "react";
import PropTypes from "prop-types";
import "./VideoPreview.scss";

const VideoPreview = (props) => (
  <div className="VideoPreview">
    <img
      src={`/videos/${props.video._id}/thumbnail.png`}
      title={props.video.title}
      alt="video preview"
      onClick={() => props.history.push(`/watch/${props.video._id}`)}
    />

    <b>{props.video.title}</b>
  </div>
);

VideoPreview.propTypes = {
  video: PropTypes.object.isRequired,
};

export default VideoPreview;
