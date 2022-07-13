import React, { Component } from "react";

export default class Favourites extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      genres: [],
      currGenre: "All Genres",
      currText: "",
      limit: 5,
      page: 1,
    };
  }

  componentDidMount() {
    let moviesArr = JSON.parse(localStorage.getItem("movies") || "[]");
    this.setState({
      movies: [...moviesArr],
    });
    this.handleGenre();
  }

  handleGenre = () => {
    let genreObj = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Science Fiction",
      10770: "TV Movie",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };
    let moviesArr = JSON.parse(localStorage.getItem("movies") || "[]");
    let genreArr = [];
    for (let i = 0; i < moviesArr.length; i++) {
      let movieObj = moviesArr[i];
      let genre = genreObj[movieObj.genre_ids[0]];
      if (!genreArr.includes(genre) && genre !== undefined) {
        genreArr.push(genre);
      }
    }
    genreArr.unshift("All Genres");
    this.setState({
      genres:[...genreArr],
    })
  }

  handleClick = (genre) => {
    this.setState({
      currGenre: genre,
    });
  };

  handleSearch = (e) => {
    this.setState({
      currText: e.target.value,
    });
  };

  handleLimit = (e) => {
    this.setState({
      limit: e.target.value,
    });
  };

  handleDelete = (id) => {
    let temp = [];
    temp = this.state.movies.filter((movieObj) => movieObj.id !== id);
    this.setState({
      movies: [...temp],
    });
    localStorage.setItem("movies", JSON.stringify(temp));
    this.handleGenre();
  };

  render() {
    let genreObj = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Science Fiction",
      10770: "TV Movie",
      53: "Thriller",
      10752: "War",
      37: "Western",
      10765: "Thriller",
    };
    let filteredArr = [];
    if (this.state.currGenre === "All Genres") {
      filteredArr = this.state.movies;
    } else {
      let genre = this.state.currGenre;
      filteredArr = this.state.movies.filter((movieObj) => {
        let movieGenre = genreObj[movieObj.genre_ids[0]];
        if (genre === movieGenre) return true;
        else return false;
      });
    }

    if (this.state.currText !== "") {
      filteredArr = filteredArr.filter((movieObj) => {
        let original_name =
          movieObj.original_name !== undefined
            ? movieObj.original_name.toLowerCase()
            : "";
        let title =
          movieObj.title !== undefined ? movieObj.title.toLowerCase() : "";
        let name =
          movieObj.name !== undefined ? movieObj.name.toLowerCase() : "";

        if (
          original_name.includes(this.state.currText.toLowerCase()) ||
          name.includes(this.state.currText.toLowerCase()) ||
          title.includes(this.state.currText.toLowerCase())
        )
          return true;
        else return false;
      });
    }

    let pagesLength =
      filteredArr.length % this.state.limit === 0
        ? filteredArr.length / this.state.limit
        : filteredArr.length / this.state.limit + 1;
    let pagesArr = [];
    for (let i = 1; i <= pagesLength; i++) {
      pagesArr.push(i);
    }
    let si = (this.state.page - 1) * this.state.limit;
    let ei = si + this.state.limit;

    filteredArr = filteredArr.slice(si, ei);

    return (
      <>
        <div
          className="container"
          style={{ width: "100vw", marginTop: "2rem" }}
        >
          <div className="row">
            <div className="col-3" style={{ paddingRight: "3rem" }}>
              <ul class="list-group">
                {this.state.genres.map((genre) =>
                  this.state.currGenre === genre ? (
                    <li
                      className="list-group-item"
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        backgroundColor: "darkblue",
                        cursor: "pointer",
                      }}
                    >
                      {genre}
                    </li>
                  ) : (
                    <li
                      className="list-group-item"
                      style={{ cursor: "pointer" }}
                      onClick={() => this.handleClick(genre)}
                    >
                      {genre}
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="col-1"></div>
            <div className="col-8">
              <div className="row">
                <div className="col-6">
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                      style={{ backgroundColor: "lightgray" }}
                      placeholder="Search"
                      onChange={(e) => this.handleSearch(e)}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="input-group mb-3">
                    <input
                      type="number"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                      style={{ backgroundColor: "lightgray" }}
                      placeholder="Limit"
                      onChange={(e) => this.handleLimit(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <table className="table" style={{color:"white"}}>
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">Title</th>
                      <th scope="col">Popularity</th>
                      <th scope="col">Rating</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredArr.map((movieObj) => (
                      <tr>
                        <td>
                          <img
                            src={`https://image.tmdb.org/t/p/w500${movieObj.poster_path}`}
                            alt={movieObj.title}
                            style={{ width: "7rem", height: "4rem" }}
                          />
                        </td>
                        <td>
                          {movieObj.title ||
                            movieObj.original_title ||
                            movieObj.name}
                        </td>
                        <td>{movieObj.vote_count}</td>
                        <td>{movieObj.vote_average}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => this.handleDelete(movieObj.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    {pagesArr.map((pages) => (
                      <li
                        className="page-item"
                        style={{ cursor: "pointer" }}
                        onClick={() => this.setState({ page: pages })}
                      >
                        <a className="page-link">{pages}</a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
