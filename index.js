const express = require('express');
const fetchTweets = require('./lib/services/twitter');
const app = express();

app.use(express.static('./assets'));

app.set('view engine', 'ejs');

app.get('/',(req, res)=>{
    res.render('pages/home',{
        title: 'Home',
        headline: 'Willkommen',
        headlineAbout: 'Über mich'
    });
});

app.get('/about',(req, res)=>{
    res.render('pages/about',{
        title: 'About me',
        headline: 'Über mich',
        name: 'Martha Duepont',
        matriculation: '294242',
        age: '31',
        born: '04.05.1985',
        cityOfBirth: 'Swidnik, Polen',
        trade:'Rechtsanwalts- und Notarfachangestellte',
        study: 'Internationaler Frauenstudiengang Informatik',
        cityOfStudy: 'Bremen',
        familySituation: 'verheiratet',
        children: 'Johanna Duepont',
        bornChild: '05.05.2013',
    });
});

app.get('/tweets',(req, res)=>{

    const query = req.query.q || 'Node.js';

    fetchTweets(query)
        .then((tweets) => {
            res.render('pages/tweets',{
                title: 'Tweets',
                headline: 'My Tweets',
                tweets,
            });    
        });
});

app.listen(8080, (err)=>{
    if (err){
        return console.error(err.message);
    }
    console.log('webapp_static is listening for request');
});