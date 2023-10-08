// Store the original console.error function
// import initGL from "./gl.js";
import { initCanvas, fillCanvas } from "./shitty-renderer/canvas.js";
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
  // initGL();
  initCanvas();
  const rangeArr = range(255);
  const arr = rangeArr
    .map((x) =>
      rangeArr.map((y) => ({ r: x, g: y, b: 0 })
    ))
    .flat()
    .sort( 
      (a, b) => {
      if (a.r !== b.r) {
          return a.r - b.r;
      }
    return a.g - b.g;
  });
  fillCanvas(arr);
} catch (error) {
  errorLogger(error);
}
