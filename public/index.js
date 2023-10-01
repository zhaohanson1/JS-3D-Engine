// Store the original console.error function


function errorLogger(data) {
  const url = "/log-error"; // Replace with your API endpoint URL

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
    },
    body: JSON.stringify({error: data}), // Convert JavaScript object to JSON string
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



window.onerror = function(message, url, lineNumber) {
  errorLogger(message);
};
