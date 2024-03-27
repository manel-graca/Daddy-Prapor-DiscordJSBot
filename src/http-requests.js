const axios = require('axios');

function makeGetRequest(url) {
  return axios.get(url)
    .then(response => {
      // Assuming the response is in JSON format
      const data = response.data;
      console.log(data);
      // Create a GoonsAPIResponseData object
      const GoonsAPIResponseData = {
        currentMap: data["Current Map"][0],
        location: data["Location"][0],
        time: data["Time"][0],
        timeSubmitted: data["TimeSubmitted"][0],
        report: data["Report"][0]
      };

      return GoonsAPIResponseData;
    })
    .catch(error => {
      console.error(error);
    });
}

module.exports = makeGetRequest;