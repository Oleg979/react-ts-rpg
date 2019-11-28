import React, { useState, useEffect } from "react";
import "../App.css";
import MapGenerator from "../helpers/generators/mapGenerator";
import GameConfig from "../helpers/interfaces/GameConfig";
import initGame from "../helpers/inits/init";
import wall from "../assets/wall.jpg";
import road from "../assets/road.jpg";

export default ({
  width,
  height,
  numOfChests,
  numOfSecrets,
  roadTexture,
  wallTexture
}: GameConfig) => {
  const mapGenerator = new MapGenerator(
    width,
    height,
    numOfChests,
    numOfSecrets
  );

  let map = mapGenerator.generate();

  useEffect(() => {
    initGame();
  }, []);

  return (
    <div>
      <table>
        <tbody>
          {map.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.map((cell, cellIdx) => (
                <td
                  id={`${rowIdx}_${cellIdx}`}
                  onClick={e => {
                    if (cell === " ") return;
                  }}
                  className={`${cell !== " " ? "free" : "wall"} ${
                    cell === "1" ? "chest" : cell === "2" ? "secret" : ""
                  }`}
                  key={cellIdx}
                  style={{
                    backgroundImage: `url(${cell === " " ? wall : road})`,
                    boxShadow:
                      cell !== " "
                        ? "inset 0px 0px 3px 3px #c6814a"
                        : "inset 0px 0px 3px 3px #4f5157"
                  }}
                >
                  {cell === "1" && (
                    <img
                      src={require("../assets/chest.png")}
                      width={width}
                      alt={"Chest"}
                    />
                  )}
                  {cell === "2" && (
                    <img
                      src={require("../assets/question.png")}
                      alt={"Secret"}
                      width={width}
                    />
                  )}
                  {map[rowIdx][cellIdx] === "3" && (
                    <img
                      className="player"
                      src={require("../assets/player.png")}
                      alt={"Player"}
                      width={width}
                      onClick={e => {
                        e.stopPropagation();
                        return false;
                      }}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
