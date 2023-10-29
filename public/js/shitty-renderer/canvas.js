import { Canvas } from "./2DCanvas.js";
let _base;
let _pixelSize;
let _canvasMemory;
export const initCanvas = (width = 255, height = 255, pixelSize = 2) => {
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
const createPixel = (pixel) => {
    const { r, g, b } = pixel;
    const pixelDiv = document.createElement("div");
    pixelDiv.style.width = `${_pixelSize}px`;
    pixelDiv.style.height = `${_pixelSize}px`;
    pixelDiv.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    return pixelDiv;
};
const fillCanvas = (pixels) => {
    pixels.forEach((row) => {
        row.forEach((pixel) => {
            const pixelDiv = createPixel(pixel);
            _base.appendChild(pixelDiv);
        });
    });
};
export const clearCanvas = () => {
    _base.replaceChildren();
};
export const render = () => {
    const paintedCanvas = _canvasMemory.paintCanvas();
    fillCanvas(paintedCanvas);
};
export const drawOnCanvas = (pixels) => {
    _canvasMemory.drawOnLayer(pixels);
};
//# sourceMappingURL=canvas.js.map