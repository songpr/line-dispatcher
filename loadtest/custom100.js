const https = require('https');
const CryptoJS = require("crypto-js");
// const { json } = require('stream/consumers');

const contents = require('fs').readFileSync("./loadtest/100.json");

// Set the value of a header to a custom value, which
// in this example comes from an HTTP call to another
// API

var i = 0;

// function setCount(context, events, done) {
//   i= i+1;
//   context.vars.count = i;
//   console.log(context.vars.count);
//   return done();
// }

function setJSONBody(requestParams, context, ee, next) {
  //console.log(requestParams.body)
  // i= i+1;
  // context.vars.count = i;
  // console.log(context.vars.count);
  const requestJSON = JSON.parse(contents);
  if(i <= requestJSON.length) { 
    //context.vars.requestBody = requestJSON[i];
    //requestParams.body = requestJSON[i];
    requestParams.json = requestJSON[i];
    i = i+1;
  }

  return next(); // MUST be called for the scenario to continue
}

function setCustomHeader(requestParams, context, ee, next) {
  //console.log(requestParams.body)
  var signBytes = CryptoJS.HmacSHA256(JSON.stringify(requestParams.json), 'YOUR_LINE_CHANNEL_SECRET').toString(CryptoJS.enc.Base64);
  requestParams.headers['x-line-signature'] = signBytes;
  //console.log(signBytes)
  return next();
}

function logResponse(requestParams, response, context, ee, next) {
  // console.log(requestParams.headers);
  // console.log(requestParams.body);

  console.log(response.body);
  return next(); // MUST be called for the scenario to continue
}

const generatePostBodyFromHttps = async(userContext, events, done) => {
  let data = '';

  const options = {
    hostname: 'api.json-generator.com',
    path: '/templates/b5WAJ3r-7tui/data?status=200',
    headers: {
        Authorization: 'Bearer cyracfb74fcd1ual5nap8jew4a0waxjx9i2w887q',
        Accept : 'application/json'
    }
  }

  https.get(options, (res) => {
    res.on('data', (d) => {
      
      data += d;
    });

    res.on('end', () => {
      let json = JSON.parse(data);
      console.log(json)
      // Extract a string composed of letters + spaces + punctuation:
      // const val = json.match(/^<([A-Za-z\!\s]+)/m)[1].trim();
      // // Use that as the value of our custom header:
      // req.headers['test'] = val;
      return done();
    });
    
  }).on('error', (e) => {
    console.log(e)
    return next(e);
  });
}

const generateBodyFromFiles = async(userContext, events, done) => {
    var payload = {
      "data":"data"
    };
    payload = JSON.parse(contents);
    userContext.vars.payload = payload;

    //console.log(JSON.stringify(payload));

    return done();
} 

function generateRandomPayload(userContext, events, done) {    
  var payload = {
    "Data":"hasbeenremoved",
    "Email":"email"
  };   
  userContext.vars.payload = payload;  
  // console.log(payload)
  return done();
}

module.exports = {
  setJSONBody,
  setCustomHeader,
  logResponse,
  generatePostBodyFromHttps,
  generateBodyFromFiles,
  generateRandomPayload,
  // setCount
};