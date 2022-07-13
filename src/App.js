import "./App.css";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Movies from "./components/Movies";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Favourites from "./components/Favourites";
function App() {
  return (
    <div style={{backgroundColor:"black",height:"100vh",width:"100vw",paddingTop:"1rem"}}>
      <Router>
        <Routes>
          <Route
            path="/index"
            exact
            element={
              <>
                <Navbar />
                <Banner />
                <Movies />
              </>
            }
          />
          <Route
            path="/favourites"
            exact
            element={
              <>
                <Navbar />
                <Favourites />
              </>
            }
          />
          <Route path="/" exact element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
