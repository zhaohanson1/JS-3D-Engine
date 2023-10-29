import { Pixel } from "../primitives/pixel.js";

export class Layer {
  _width: number;
  _height: number;
  _pixels: Pixel[][];

  constructor(width: number, height: number) {
    this._width = width;
    this._height = height;
    this._pixels = new Array(height)
      .fill(null)
      .map(() => new Array(width).fill(null));
  }

  drawPixel(x: number, y: number, pixel: Pixel): void {
    this._pixels[x][y] = pixel;
  }

  draw(pixels: Pixel[][]): void {
    pixels.forEach((row, x) => {
      row.forEach((pixel, y) => {
        this.drawPixel(x, y, pixel);
      });
    });
  }

  getPixels(): Pixel[][] {
    return this._pixels;
  }
}
