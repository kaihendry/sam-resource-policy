const AWSXRay = require("aws-xray-sdk-core");
AWSXRay.captureHTTPsGlobal(require("https"));

const axios = require("axios");
const aws4 = require("aws4");
let response;

exports.lambdaHandler = async (event, context) => {
  console.log(process.env);

  // let request = aws4.sign({
  let request = {
    method: "GET",
    url: "https://ytecj8f77e.execute-api.ap-southeast-1.amazonaws.com/Prod/",
  };

  try {
    let result = await axios(request);
    console.log(JSON.stringify(result.data));
    response = {
      statusCode: 200,
      body: JSON.stringify(result.data),
    };
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
    // What response should we return?
    return error;
  }
  return response;
};
