import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }

  handlePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  handleSubmit = () => {
    if (this.state.password === "" || this.state.email === "") {
      alert("Enter All Necessary Details😢");
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)
    ) {
      alert("Email is wrongly typed!😢", this.state.email);
    }
  };

  render() {
    return (
      <div
        style={{
          height: "100vh",
          width:"100vw",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          paddingTop: "5%",
          backgroundColor:"black"
        }}
      >
        <div
          id="formContent"
          style={{
            boxShadow:
              "rgba(255, 255, 255, 0.3) 20px 40px 30px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
            height: "25rem",
            width: "23rem",
            padding: "1rem",
            backgroundColor:"white",
            borderRadius:"1rem"
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginTop: "3rem",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
          >
            <h3 style={{ fontFamily: "monotype-corsiva" }}>Movies Library</h3>
          </div>

          {/* <!-- Login Form --> */}
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              height: "15rem",
            }}
          >
            <div class="input-group flex-nowrap">
              <input
                type="text"
                class="form-control"
                placeholder="Email"
                aria-label="Email"
                pattern="[^ @]*@[^ @]*"
                aria-describedby="addon-wrapping"
                style={{
                  width: "20rem",
                  height: "3rem",
                  backgroundColor: "lightgrey",
                }}
                onChange={(e) => {
                  this.handleEmail(e);
                }}
              />
            </div>
            <div class="input-group flex-nowrap">
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                aria-label="Password"
                aria-describedby="addon-wrapping"
                style={{
                  width: "20rem",
                  height: "3rem",
                  backgroundColor: "lightgrey",
                }}
                onChange={(e) => {
                  this.handlePassword(e);
                }}
              />
            </div>
            {
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                {this.state.password === "" ||
                this.state.email === "" ||
                !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                  this.state.email
                ) ? (
                  <>
                    <button
                      type="button"
                      class="btn btn-primary"
                      style={{ width: "8rem", backgroundColor:"red"}}
                      onClick={this.handleSubmit}
                    >
                      Log In
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      style={{ width: "8rem",backgroundColor:"red" }}
                      onClick={this.handleSubmit}
                    >
                      Sign Up
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/index">
                      <button
                        type="button"
                        class="btn btn-primary"
                        style={{ width: "8rem",backgroundColor:"red" }}
                        onClick={this.handleSubmit}
                      >
                        Log In
                      </button>
                    </Link>
                    <Link to="/index">
                      <button
                        type="button"
                        class="btn btn-primary"
                        style={{ width: "8rem",backgroundColor:"red" }}
                        onClick={this.handleSubmit}
                      >
                        Sign Up
                      </button>
                    </Link>
                  </>
                )}
              </div>
            }
          </form>
        </div>
      </div>
    );
  }
}
