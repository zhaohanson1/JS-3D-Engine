import { Pixel } from "../primitives/pixel.js";
import { Canvas } from "./2DCanvas.js";

let _base: HTMLElement;
let _pixelSize: number;
let _canvasMemory: Canvas;

export const initCanvas = (
  width: number = 255,
  height: number = 255,
  pixelSize: number = 2
): void => {
  const base = document.createElement("div");
  _base = base;
  _pixelSize = pixelSize;

  base.style.display = "grid";
  base.style.width = `${width}`;
  base.style.height = `${height}`;
  base.style.gridTemplate = `repeat(${width}, ${_pixelSize}px) / repeat(${height}, ${_pixelSize}px)`;
  document.body.appendChild(base);

  _canvasMemory = new Canvas();
  _canvasMemory.createLayer(width, height);
};

const createPixel = (pixel: Pixel): HTMLElement => {
  const { r, g, b } = pixel;
  const pixelDiv = document.createElement("div");
  pixelDiv.style.width = `${_pixelSize}px`;
  pixelDiv.style.height = `${_pixelSize}px`;
  pixelDiv.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  return pixelDiv;
};

const fillCanvas = (pixels: Pixel[][]): void => {
  pixels.forEach((row) => {
    row.forEach((pixel) => {
      const pixelDiv = createPixel(pixel);
      _base.appendChild(pixelDiv);
    });
  });
};

export const clearCanvas = (): void => {
  _base.replaceChildren();
};

export const render = (): void => {
  const paintedCanvas = _canvasMemory.paintCanvas();
  fillCanvas(paintedCanvas);
};

export const drawOnCanvas = (pixels: Pixel[][]): void => {
  _canvasMemory.drawOnLayer(pixels);
};
