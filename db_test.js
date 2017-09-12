
const Article = require('./models/article');
const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/test';
const config = require('./config');
const BOT_TOKEN = config.bot_token;
const AYLIEN_ID = config.aylien_id;
const AYLIEN_KEY = config.aylien_key;
mongoose.Promise = global.Promise;
mongoose.connect(mongoDB);

const AYLIENTextAPI = require('aylien_textapi');
const textapi = new AYLIENTextAPI({
    application_id: AYLIEN_ID,
    application_key: AYLIEN_KEY 
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', ()=>{
    console.log('connected to mongodb');
});

var article = new Article({
    user: 'jeffrey.ong',
    user_id: 'jeffrey.ong',
    timestamp: Date.now(),
    concepts: [],
    url: "https://www.nytimes.com/2017/08/13/technology/the-messy-confusing-future-of-tv-its-here.html"
});


// article.concepts = ['tv', 'JFK'];

// article.save(function(err){
//     if(err) {
//         console.error(err);
//     }
//     else {
//         console.log('saved new article');
//     }
//     mongoose.connection.close();
// });

textapi.concepts({
    url: "https://www.nytimes.com/2017/08/13/technology/the-messy-confusing-future-of-tv-its-here.html"
    }, function(error, response) {
        if (error === null) {
            concepts = [];

            Object.keys(response.concepts).forEach((key)=>{
                response.concepts[key].surfaceForms.forEach((sf)=>{
                    console.log(sf)
                    concepts.push(sf['string']);
                });
            })

            // console.log(concepts)

            // console.log(concept + ": " + surfaceForms.join(","));
        // });
        }else {
            console.log(error)
        }
});

// natural_language_understanding.analyze(nluOptions, (error, response)=>{
//     var article = new Article({
//         user: 'jeffrey.ong',
//         user_id: 'jeffrey.ong',
//         timestamp: Date.now(),
//         concepts: [],
//         url: url
//     });

//     if (error){
//         console.log(error)
//         article.save((err)=>{
//             if(err){
//                 console.error(err);
//             }else {
//                 console.log('saved new article');
//             }
//         });
//     }
//     else {
//         concepts = []

//         response.entities.forEach((e)=>{
//             concepts.push(e.text)
//         });

//         response.concepts.forEach((c)=>{
//             response.entities.push(c.text);
//         });

//         console.log(concepts);
//         article.concepts = concepts;

//         article.save((err)=>{
//             if(err){
//                 console.error(err);
//             }else {
//                 console.log('saved new article');
//             }
//         });
//     }
// });
