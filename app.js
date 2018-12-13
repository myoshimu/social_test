var Twitter = require('twitter');
var dotenv = require('dotenv');
dotenv.load();

// Imports the Google Cloud client library
const Language = require('@google-cloud/language');
const BigQuery = require('@google-cloud/bigquery');

// Instantiates a client
const language = Language();
const bigquery = BigQuery({
    projectId: process.env.GCP_PROJECT_ID
});

const hashtag = process.env.HASHTAG;

var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

client.stream('statuses/filter', {track: hashtag}, function(stream) {
    stream.on('data', function(tweet) {
        // Instantiates a Document, representing the provided text
        const document = language.document({ content: tweet.text });

        // Detects the sentiment of the document
        document.detectSentiment()
        .then((results) => {
            const sentiment = results[1].documentSentiment;
            // Create the object to be inserted into BQ
            var dataInserted = {
                "HashTag" : hashtag,
                "Tweet" : tweet.text,
                "SentimentScore" : sentiment.score,
                "SentimentMagnitude" : sentiment.magnitude,
                "InsertDate" : new Date().getTime()
            }
            // Insert the object into BQ
            bigquery
            .dataset('twitter')
            .table('twitter_stream')
            .insert(dataInserted)
        
        })
        .catch((err) => {
            console.error('ERROR:', err);
        });
    });
    stream.on('error', function(error) {
        console.log(error);
    });
});
