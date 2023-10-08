import { initCanvas, fillCanvas } from "./shitty-renderer/canvas.js";
import { range } from "./utils.js";
function errorLogger(data) {
    const url = "/log-error";
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ error: data }),
    })
        .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
        .then((data) => {
        console.log("Response data:", data);
    })
        .catch((error) => {
        console.error("Error:", error);
    });
}
window.onerror = function (message, _source, _lineNumber) {
    errorLogger(message);
};
try {
    initCanvas();
    const rangeArr = range(255);
    const arr = rangeArr
        .map((x) => rangeArr.map((y) => ({ r: x, g: y, b: 0 })))
        .flat()
        .sort((a, b) => {
        if (a.r !== b.r) {
            return a.r - b.r;
        }
        return a.g - b.g;
    });
    fillCanvas(arr);
}
catch (error) {
    errorLogger(error);
}
//# sourceMappingURL=index.js.map