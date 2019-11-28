import React from "react";
import { render } from "react-dom";
import Game from "./components/Game";
import GameConfig from "./helpers/interfaces/GameConfig";

const config: GameConfig = {
  width: 150,
  height: 150,
  numOfChests: 25,
  numOfSecrets: 50,
  wallTexture: "../assets/wall.jpg",
  roadTexture: "../assets/road.jpg"
};

render(<Game {...config} />, document.getElementById("root"));
