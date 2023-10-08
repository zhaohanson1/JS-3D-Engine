export default function initGL() {
    const canvas = document.querySelector("#glcanvas");
    if (canvas === null) {
        throw new Error("Unable to initialize WebGL. Your browser or machine may not support it.");
    }
    const gl = canvas.getContext("webgl");
    if (gl === null) {
        throw new Error("Unable to initialize WebGL. Your browser or machine may not support it.");
    }
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}
//# sourceMappingURL=gl.js.map