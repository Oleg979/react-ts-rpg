export default () => {
  let position = [0, 0];
  window.scroll(0, 0);
  document.oncontextmenu = e => e.preventDefault();

  document.querySelectorAll("td.free").forEach(tile => {
    tile.addEventListener("click", e => {
      const [row, cell] = tile.id.split("_");
      if (
        !(
          Math.abs(Number(row) - position[0]) > 1 ||
          Math.abs(Number(cell) - position[1]) > 1
        )
      ) {
        position = [Number(row), Number(cell)];
        console.log(position);
        const temp = tile as any;
        (document.getElementsByClassName("player")[0] as any).style.top =
          temp.offsetTop + "px";
        (document.getElementsByClassName("player")[0] as any).style.left =
          temp.offsetLeft + "px";
        if (!(temp.offsetLeft === 0 && temp.offsetTop === 0))
          window.scrollTo(
            temp.offsetLeft - window.innerWidth / 2 + tile.clientWidth,
            temp.offsetTop - window.innerHeight / 2 + tile.clientHeight
          );
      }
    });
  });

  let start = document.getElementById("0_0");
  if (start) start.click();

  document.onkeydown = e => {
    let element;
    switch (e.keyCode) {
      case 37:
        element = document.getElementById(`${position[0]}_${position[1] - 1}`);
        (document.getElementsByClassName(
          "player"
        )[0] as any).src = require("../../assets/player_left.png");
        break;
      case 38:
        element = document.getElementById(`${position[0] - 1}_${position[1]}`);
        (document.getElementsByClassName(
          "player"
        )[0] as any).src = require("../../assets/player_up.png");
        break;
      case 39:
        element = document.getElementById(`${position[0]}_${position[1] + 1}`);
        (document.getElementsByClassName(
          "player"
        )[0] as any).src = require("../../assets/player_right.png");
        break;
      case 40:
        element = document.getElementById(`${position[0] + 1}_${position[1]}`);
        (document.getElementsByClassName(
          "player"
        )[0] as any).src = require("../../assets/player.png");
        break;
      default:
        return;
    }
    if (element) {
      if (!element.classList.contains("free")) return;
      element.click();
    }
  };
};
