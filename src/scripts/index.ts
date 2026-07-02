import "../styles/index.css";
import { ObjectsCanvas } from "./canvas";
import { objects } from "./canvas/objects";

import { Background } from "./background";
import { Character } from "./character";
import { createColorCustomProps } from "./colors";
import { initScreenshots } from "./screenshots";

createColorCustomProps();

const keys = new Set<string>();

const characterElement = document.querySelector(".character") as HTMLElement;
const character = new Character(characterElement, keys);

const scrollElements = Array.from(
  document.querySelectorAll(".background .scroll"),
) as HTMLElement[];
const backgroundElement = document.querySelector(".background") as HTMLElement;

const SPEED = 3;
const CYCLE_WIDTH = backgroundElement.scrollWidth * 3;

const background = new Background(
  scrollElements,
  keys,
  SPEED,
  CYCLE_WIDTH,
  backgroundElement,
);

const canvasElement = document.querySelector("canvas") as HTMLCanvasElement;
const objectsCanvas = new ObjectsCanvas(
  canvasElement,
  objects,
  keys,
  SPEED,
  CYCLE_WIDTH,
);

const screenshotBtn = document.querySelector(
  ".screenshot",
) as HTMLButtonElement;
initScreenshots(screenshotBtn);

let resizeTimeout: ReturnType<typeof setTimeout> | null = null;

document.addEventListener("keydown", (e) => keys.add(e.key));
document.addEventListener("keyup", (e) => keys.delete(e.key));
document.addEventListener("wheel", (e) => {
  keys.add(e.deltaY > 0 ? "ArrowRight" : "ArrowLeft");
  setTimeout(() => {
    keys.delete("ArrowRight");
    keys.delete("ArrowLeft");
  }, 1000);
});

let touchStartX = 0;
document.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});
document.addEventListener("touchmove", (e) => {
  const touchEndX = e.touches[0].clientX;
  const diff = touchStartX - touchEndX;

  if (diff > 10) {
    keys.add("ArrowRight");
  } else if (diff < -10) {
    keys.add("ArrowLeft");
  }
  touchStartX = touchEndX;
});

document.addEventListener("touchend", () => {
  keys.delete("ArrowRight");
  keys.delete("ArrowLeft");
});

setInterval(() => {
  if (keys.has("ArrowLeft")) character.move(-1);
  if (keys.has("ArrowRight")) character.move(1);
}, 100);

window.addEventListener("resize", () => {
  if (resizeTimeout) {
    clearTimeout(resizeTimeout);
  }
  resizeTimeout = setTimeout(() => {
    background.resize();
    if (canvasElement) {
      objectsCanvas.resize();
    }
    resizeTimeout = null;
  }, 150);
});
