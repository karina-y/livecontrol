import React, { Component } from "react";
import "./VideoPlayer.scss";
import autobind from "react-autobind";
import { toast } from "react-toastify";

class VideoPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resolution: "480",
      video: {},
      fit: true,
    };

    autobind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    fetch(`http://localhost:8080/api/video/${id}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.text())
      .then((res) => this.setState({ video: JSON.parse(res) }))
      .catch((err) => toast.error(err.message));
  }

  render() {
    return (
      <div className="VideoPlayer">
        <p className="page-title">{this.state.video.title}</p>

        <div className="flex-center">
          {/* if pulling from online stream api would be ideal */}
          <video
            controls
            autoPlay
            className={`video ${this.state.fit ? "fit" : ""}`}
            src={`/videos/${this.state.video._id}/${this.state.resolution}.mp4`}
          />
        </div>

        <div>
          <select
            onChange={(e) => this.setState({ resolution: e.target.value })}
            value={this.state.resolution}
          >
            <option value={240}>240p</option>
            <option value={480}>480p</option>
            <option value={1080}>1080p</option>
            <option value={2160}>4k</option>
          </select>
        </div>

        <div>
          <label>
            {/* keeps resolution at what's selected, just sets a max-width so it doesn't extend off screen, defaulted to checked */}
            Fit video
            <input
              type="checkbox"
              checked={this.state.fit}
              onChange={() => this.setState({ fit: !this.state.fit })}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default VideoPlayer;
