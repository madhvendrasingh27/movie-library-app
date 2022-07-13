import { Component } from "react";
import axios from "axios";

export default class Movies extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      parr: [1],
      currPage: 1,
      favourites: [],
      searchText: "",
    };
  }

  async componentDidMount() {
    let page = this.state.currPage;
    let fav = JSON.parse(localStorage.getItem("movies") || "[]");
    fav = fav.map((obj) => obj.id);
    let moviesArr = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=718d46934f6bf4656bfa3810ff61cb8e&page=${page}`
    );
    moviesArr = moviesArr.data.results;
    this.setState({
      movies: [...moviesArr],
      favourites: [...fav],
    });
  }

  changeMovies = async () => {
    let page = this.state.currPage;
    let moviesArr = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=718d46934f6bf4656bfa3810ff61cb8e&page=${page}`
    );
    moviesArr = moviesArr.data.results;
    this.setState({
      movies: [...moviesArr],
    });
  };

  handleNext = () => {
    let temp = [];
    for (let i = 1; i <= this.state.parr.length + 1; i++) {
      temp.push(i);
    }

    this.setState(
      {
        parr: [...temp],
        currPage: this.state.currPage + 1,
      },
      this.changeMovies
    );
  };

  handlePrev = () => {
    if (this.state.currPage !== 1) {
      this.setState(
        {
          currPage: this.state.currPage - 1,
        },
        this.changeMovies
      );
    }
  };

  handleClick = (pageValue) => {
    this.setState(
      {
        currPage: pageValue,
      },
      this.changeMovies
    );
  };

  handleFav = (id, movieObj) => {
    let temp = [];
    let localStoragetemp = JSON.parse(localStorage.getItem("movies") || "[]");
    if (this.state.favourites.includes(id)) {
      temp = this.state.favourites.filter((mid) => mid !== id);
      localStoragetemp = localStoragetemp.filter((obj) => obj.id !== id);
    } else {
      temp = this.state.favourites;
      temp.push(id);
      localStoragetemp.push(movieObj);
    }

    this.setState(
      {
        favourites: [...temp],
      },
      localStorage.setItem("movies", JSON.stringify(localStoragetemp))
    );
  };
  handleSearch = async (e) => {
    if (e.target.value === "") {
      this.changeMovies();
      this.setState({
        searchText: "",
      });
    } else {
      let moviesArr = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=718d46934f6bf4656bfa3810ff61cb8e&query=${e.target.value}`
      );
      moviesArr = moviesArr.data.results;

      this.setState({
        movies: [...moviesArr],
        searchText: e.target.value,
      });
    }
  };

  render() {
    let movieArr = this.state.movies;
    return (
      <div style={{backgroundColor:"black"}}>
        <div
          style={{
            display: "flex",
            paddingTop: "1rem",
            paddingBottom: "1rem",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <h2>Trending</h2>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            style={{
              backgroundColor: "lightgray",
              height: "3rem",
              width: "18rem",
              position: "absolute",
              right: "4rem",
            }}
            placeholder="Search Movie"
            onChange={(e) => this.handleSearch(e)}
          />
        </div>
        {movieArr.length === 0 ? (
          <div
            class="spinner-border text-primary"
            role="status"
            style={{ marginTop: "2rem", marginLeft: "50%" }}
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : (
          <>
            <div
              className="movie-card"
              style={{
                display: "flex",
                gap: "1rem",
                flex: "auto",
                justifyContent: "space-around",
                flexWrap: "wrap",
              }}
            >
              {movieArr.map((movieObj) => (
                <div
                  className="card"
                  style={{
                    height: "18rem",
                    width: "14rem",
                    position: "relative",
                  }}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movieObj.poster_path}`}
                    className="card-img-top"
                    alt={movieObj.original_name}
                    style={{ height: "100%", width: "100%" }}
                  />
                  <a
                    className="btn btn-primary"
                    style={{
                      position: "absolute",
                      bottom: "1rem",
                      alignSelf: "center",
                      cursor: "pointer",
                      backgroundColor:"red"
                    }}
                    onClick={() => this.handleFav(movieObj.id, movieObj)}
                  >
                    {this.state.favourites.includes(movieObj.id)
                      ? "Remove From Favourites"
                      : "Add to Favourites"}
                  </a>
                </div>
              ))}
            </div>
            {this.state.searchText !== "" ? (
              <></>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "1rem",
                }}
              >
                <nav
                  aria-label="Page navigation example"
                  style={{ cursor: "pointer" }}
                >
                  <ul class="pagination">
                    <li class="page-item">
                      <a class="page-link" onClick={this.handlePrev}>
                        Previous
                      </a>
                    </li>
                    {this.state.parr.map((value) => (
                      <li class="page-item">
                        <a
                          class="page-link"
                          onClick={() => this.handleClick(value)}
                        >
                          {value}
                        </a>
                      </li>
                    ))}
                    <li class="page-item">
                      <a class="page-link" onClick={this.handleNext}>
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    );
  }
}
