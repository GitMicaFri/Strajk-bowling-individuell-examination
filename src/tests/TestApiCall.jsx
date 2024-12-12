import React from "react";

function TestApiCall() {
  async function callApi() {
    try {
      const response = await fetch("/api/confirmation", {
        method: "GET", // Eller "POST" beroende på vad du vill testa
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);
      alert("API Call Success: " + JSON.stringify(data));
    } catch (error) {
      console.error("API Call Error:", error);
      alert("API Call Failed: " + error.message);
    }
  }

  return (
    <button onClick={callApi}>Test API Call</button>
  );
}

export default TestApiCall;
