const AWSXRay = require('aws-xray-sdk-core');
AWSXRay.captureHTTPsGlobal(require('https'));

const axios = require('axios');
const aws4 = require('aws4');
let response;

exports.lambdaHandler = async (event, context) => {

  let request = aws4.sign({
    method: 'GET',
    url: "https://ytecj8f77e.execute-api.ap-southeast-1.amazonaws.com/Prod/",
  });

  let result = await axios(request);
  console.log(JSON.stringify(result.data));
  if (result.errors && result.errors.length > 0) {
    console.error(result.errors)
  }

    try {
        response = {
            'statusCode': 200,
            'body': JSON.stringify(result.data)
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
