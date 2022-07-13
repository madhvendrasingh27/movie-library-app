import React, { Component } from "react";
import axios from "axios";

export default class Banner extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
    };
  }
  async componentDidMount() {
    let moviesArr = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=718d46934f6bf4656bfa3810ff61cb8e&page=1}`
    );
    moviesArr = moviesArr.data.results;
    this.setState({
      movies: [...moviesArr],
    });
  }
  render() {
    let bannerMovie =
      this.state.movies === [] ? [] : this.state.movies.slice(14, 19);
    return (
      <div style={{ display: "flex", height: "55vh", width: "100vw" }}>
        {bannerMovie.map((movieObj) => (
          <div style={{ height: "100%", width: "20%", position: "relative" }}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movieObj.poster_path}`}
              alt={movieObj.title}
              style={{ height: "100%", width: "100%" }}
            />
          </div>
        ))}
      </div>
    );
  }
}
