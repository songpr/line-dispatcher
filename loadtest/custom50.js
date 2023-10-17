const https = require('https');
const CryptoJS = require("crypto-js");
const contents = require('fs').readFileSync("./50.json");

var i = 0;

function setJSONBody(requestParams, context, ee, next) {
  const requestJSON = JSON.parse(contents);
  if(i <= requestJSON.length) { 
    requestParams.json = requestJSON[i];
    i = i+1;
  }

  return next(); // MUST be called for the scenario to continue
}

function setCustomHeader(requestParams, context, ee, next) {
  var signBytes = CryptoJS.HmacSHA256(JSON.stringify(requestParams.json), 'YOUR_LINE_CHANNEL_SECRET').toString(CryptoJS.enc.Base64);
  requestParams.headers['x-line-signature'] = signBytes;
  return next();
}

function logResponse(requestParams, response, context, ee, next) {
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

module.exports = {
  setJSONBody,
  setCustomHeader,
  logResponse,
  generatePostBodyFromHttps,
};