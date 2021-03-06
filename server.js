var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool = require('pg').pool;
var crypto = require('crypto');
var bodyParser = require('body-Parser');

var config = {
    user: 'srinidhisrinidhisrinidhi',
    database: 'srinidhisrinidhisrinidhi',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: db-srinidhisrinidhisrinidhi-49721
};


var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

var articles = { 
    'article-one': {
        title: 'Article One | Srinidhi',
        heading: 'Article One',
        date: 'Aug 4, 2017',
        content: `
                    <p>
                        This Is My First Content Of My Article.This Is My First Content Of My Article.This Is My First Content Of My Article.This Is My First Content Of My Article.This Is My First Content Of My Article.This Is My First Content Of My Article.This Is My First Content Of My Article.
                    </p>
                    <p>
                        This Is My First Content Of My Article.This Is My First Content Of My Article.This Is My First Content Of My Article.This Is My First Content Of My Article.This Is My First Content Of My Article.This Is My First Content Of My Article.This Is My First Content Of My Article.
                    </p>
                    <p>
                        This Is My First Content Of My Article.This Is My First Content Of My Article.This Is My First Content Of My Article.This Is My First Content Of My Article.This Is My First Content Of My Article.This Is My First Content Of My Article.This Is My First Content Of My Article.
                    </p>`
    },
    'article-two': {        
        title: 'Article Two | Srinidhi',
        heading: 'Article Two',
        date: 'Aug 7, 2017',
        content: `
                    <p>
                        This Is My second Content Of My Article.
                    </p>`
    },
    'article-three': {
        title: 'Article Three | Srinidhi',
        heading: 'Article Three',
        date: 'Aug 6, 2017',
        content: `
                    <p>
                        This Is My third Content Of My Article.
                    </p>`        
    },
};


function createTemplate(data) {
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    
    var htmlTemplate = `
    <html>
        <head>
            <title>${title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div class='container'>
                <div>
                    <a href='/'>Home</a>
                </div>
                <hr/>
                <h3>${heading}</h3>
                <div>
                    ${date}
                </div>
                <div>
                    ${content}            
                </div>
            </div>
        </body>
    </html>
    `;
    return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input, salt) {
    // How do we create a hash?
    var hashed = crypto.pbkdf25ync(input, salt, 10000, 512, 'sha512');
    return hashed.toString('hex');
}


app.get('/hash/:input', function (req, res) {
    var hashedString = hash(req.params.input, 'this-is-some-random-string');
    res.send(hashedString);
});

app.post('/create-user', function(req, res) {
    // username, password
    // JSON
    var username = req.body.username;
    var password = req.body.password;
    var salt = crypto.randomBytest(128).toString('hex');
    var dbString = hash(password, salt);
    pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username,dbString], function(err, result) {
        if(err) {
            res.status(500).send(err.toString());
        } else {
            res.send('User Successfully Created: ' + username);
        }
    });
});


var pool = new pool(config);
app.get('/test-db', function(req, res) {
    pool.query('SELECT * FROM test', function (err, result) {
        if(err) {
            res.status(500).send(err.toString());
        } else {
            res.send(JSON.stringify(result.rows));
        }        
    });
});






var counter = 0;
app.get('/counter', function (req, res) {
    counter = counter + 1;
    res.send(counter.toString());
});

var names = [];
app.get('/submit-name', function (req, res) {
    // Get the name from request object
    var name = req.params.name;

    names.push(name);
    // JSON: Javascript Object Notation
    res.send(JSON.stringify(names));
});

app.get('/:articleName', function (req, res) {
  // articleName == article-one
  // articles[articleName] == {} content object of article one
  var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});

app.get('/article-two', function (req, res) {
    res.send('Article two requested and will be served here');
});

app.get('/article-three', function (req, res) {
    res.send('Article three requested and will be served here');
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});



// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
