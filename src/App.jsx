import { useEffect, useState } from "react";

import "./App.css";
// import Board from './components/Board'
import Calendar from "./components/Calendar";
// import Write from './components/Write'
import Datepicker from "./components/Datepicker";
import Dropzone from "./components/Dropzone";
import Timepicker from "./components/Timepicker";
// import Data from './data/db.json'

function App() {
  // const [data, setDate] = useState([]);

  return (
    <>
      {/* <h1>게시판</h1>
      <a href='write' id='write'>글쓰기</a>
      <Board data={data} />
      <Write />  */}
      {/* <Calendar /> */}
      <Datepicker />
      <Timepicker />
      <Dropzone />
    </>
  );
}

export default App;
