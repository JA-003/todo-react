import React from "react";
import ReactDOM from "react-dom";
import "bootstrap";
import "../styles/index.scss";
import { TaskList } from "./component/TaskList.js";

ReactDOM.render(<TaskList />, document.querySelector("#app"));
