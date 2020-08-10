import React, { Component } from "react";
import autobind from "react-autobind";
import { toast } from "react-toastify";
import VideoPreview from "../../components/VideoPreview/VideoPreview";
import "./VideoList.scss";

class VideoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: null,
    };

    autobind(this);
  }

  componentDidMount() {
    fetch("http://localhost:8080/api/video", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.text())
      .then((res) => {
        const videos = JSON.parse(res);

        this.setState({
          videos,
        });

        if (!videos || videos.length === 0) {
          toast.warn("No videos found");
        }
      })
      .catch((err) => toast.error(err.message));
  }

  render() {
    const props = this.props;

    return (
      <div className="VideoList">
        <p className="page-title">Select a video</p>

        {this.state.videos && this.state.videos.length > 0 ? (
          <div className="video-preview-list">
            {this.state.videos.map(function (item, index) {
              return <VideoPreview key={index} video={item} {...props} />;
            })}
          </div>
        ) : (
          <p>No videos uploaded yet.</p>
        )}
      </div>
    );
  }
}

export default VideoList;
