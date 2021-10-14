const AWSXRay = require("aws-xray-sdk-core");
const AWS = AWSXRay.captureAWS(require('aws-sdk'));
AWSXRay.captureHTTPsGlobal(require("https"));

const axios = require("axios");
const aws4 = require("aws4");

let response;

exports.lambdaHandler = async (event, context) => {
  console.log(event, context, process.env);

  // What is our role?
  const sts = new AWS.STS()
  let whoAmI = await new AWS.STS().getCallerIdentity().promise();
  console.log(whoAmI)

  let request = {
    method: "GET",
    url: "https://ytecj8f77e.execute-api.ap-southeast-1.amazonaws.com/Prod/",
    host: "ytecj8f77e.execute-api.ap-southeast-1.amazonaws.com",
    path: "/Prod",
  };

  aws4.sign(request);
  // AWS signature is now in the headers
  console.log(request);

  try {
    const ret = await axios(request);

    response = {
      statusCode: ret.status,
      body: JSON.stringify({
        message: ret.data,
      }),
    };

  } catch (error) {
    console.error(error)

    response = {
      statusCode: error.response?.status || 501,
      body: JSON.stringify({
        message: error.message,
      }),
    };

  }
  return response;
};
