// Store the original console.error function
// import initGL from "./gl.js";
import { initCanvas, drawOnCanvas, render } from "./shitty-renderer/canvas.js";
import { range } from "./utils.js";

function errorLogger(data: string) {
  const url = "/log-error"; // Replace with your API endpoint URL

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
    },
    body: JSON.stringify({ error: data }), // Convert JavaScript object to JSON string
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Parse the response body as JSON
    })
    .then((data) => {
      // Handle the JSON response here
      console.log("Response data:", data);
    })
    .catch((error) => {
      // Handle errors here
      console.error("Error:", error);
    });
}

window.onerror = function (
  message: string,
  _source: string,
  _lineNumber: number
) {
  errorLogger(message);
};

try {
  
  initCanvas();

  const rangeArr = range(255);
  const arr = rangeArr.map((x) => rangeArr.map((y) => ({ r: x, g: y, b: 0 })));
  arr.sort((a, b) => {
    if (a[0].r !== b[0].r) {
      return a[0].r - b[0].r;
    }
    return a[0].g - b[0].g;
  });


  drawOnCanvas(arr);
  render();
} catch (error) {
  errorLogger(error);
}
