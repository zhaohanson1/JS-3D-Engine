import { Layer } from "./layer.js";
import { Pixel } from "../primitives/pixel.js";

export class Canvas {
  layerStack: Layer[];
  activeLayer: number;
  constructor() {
    this.layerStack = [];
  }

  createLayer(width: number, height: number, index?: number): Layer {
    const layer: Layer = new Layer(width, height);
    if (index !== undefined) {
      this.layerStack.splice(index, 0, layer);
      this.activeLayer = index;
    } else {
      this.layerStack.push(layer);
      this.activeLayer = this.layerStack.length - 1;
    }
    return layer;
  }

  setActiveLayer(index: number): void {
    if (index < 0 || index >= this.layerStack.length) {
      throw new Error("Index is out of layerStack range");
    }
    this.activeLayer = index;
  }

  getActiveLayer(): Layer | null {
    return this.layerStack[this.activeLayer] || null;
  }

  getLayerCount(): number {
    return this.layerStack.length;
  }

  drawOnLayer(pixels: Pixel[][]): void {
    const layer = this.getActiveLayer();
    if (layer) {
      layer.draw(pixels);
    }
  }

  paintCanvas(): Pixel[][] {
    const paintedCanvas: Pixel[][] = [];
    this.layerStack.forEach((layer) => {
      const layerPixels: Pixel[][] = layer.getPixels();

      console.log('layer', layerPixels);
      for (let i = 0; i < layerPixels.length; i++) {
        for (let j = 0; j < layerPixels[i].length; j++) {
          if (paintedCanvas[i] === undefined) {
            paintedCanvas[i] = [];
          }
          // Assuming that a null or undefined pixel means it's transparent
          if (layerPixels[i][j] !== null && layerPixels[i][j] !== undefined) {
            paintedCanvas[i][j] = layerPixels[i][j];
          }
        }
      }
    });

    console.log('painted')

    return paintedCanvas;
  }
}
