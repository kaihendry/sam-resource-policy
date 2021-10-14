const AWSXRay = require("aws-xray-sdk-core");
AWSXRay.captureHTTPsGlobal(require("https"));

const https = require("https");
const aws4 = require("aws4");

let response;

exports.lambdaHandler = async (event, context) => {
  console.log(process.env);

  // let request = aws4.sign({
  let request = {
    method: "GET",
    host: "ytecj8f77e.execute-api.ap-southeast-1.amazonaws.com",
    path: "/Prod"
  };
  aws4.sign(request);
  console.log(request);

  let data = [];
  return new Promise((resolve, reject) => {
    const req = https.request(request, (res) => {
      console.log("statusCode:", res.statusCode);
      console.log("headers:", res.headers);
      res.on("data", (d) => {
        console.log("Data: ", d.toString());
        resolve(d.toString());
      });
    });
    req.on("error", (err) => {
      console.log("Error: ", err);
      reject(err);
    });
    req.end();
  });
};
