// Hug Router
// This handles all calls to the API

const router = require('express').Router();
const axios = require('axios').default;
const xmlParser = require('xml2json');

// This is how we choose which GIF to return
function getRandomArbitrary(max) {
    return Math.round(Math.random() * max);
  }
  
router.route('/').get((req, res) => {

    var options = {method: 'GET', url: 'http://hugcdn.nyc3.digitaloceanspaces.com/'};

    // Make the API request
    axios.request(options).then(function (response) {
        // Convert the XML response to a JS array
        const fullParsed = JSON.parse(xmlParser.toJson(response.data))

        // Pick which GIF to return based off of the array
        const hug = fullParsed.ListBucketResult.Contents[getRandomArbitrary(fullParsed.ListBucketResult.Contents.length)]
        const stagedResponse = {
        url: `https://hug.cdn.bigbrother.group/${hug.Key}`,
        filename: hug.Key,
        size: hug.Size
        }
        const IP = res.req.ip.substr(7)
        // Let us know that a hug has been sent out, which is very useful for knowning the activity level of the API.
        console.log(`A hug has been sent out to ${IP}`);
        // Send back the gif and related information
        res.status(200).json(stagedResponse);

    }).catch(function (error) {
        console.error(error);
        res.sendStatus(500);
    });

});

module.exports = router;
