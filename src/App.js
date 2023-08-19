import './App.css';
import {
  BrowserRouter as Router, Routes, Route
} from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import Navbar from "./Components/Navbar";
import NoteState from './Context/notes/NoteState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { useState } from 'react';


function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      typ: type
    })

    setTimeout(() => {                         //disabling alert after given time
      setAlert(null)
    }, 2000);
  }
  return (
    <>
      <NoteState>

        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">

            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login showAlert={showAlert} />} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />

            </Routes>

          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
