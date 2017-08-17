var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));


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

var counter = 0;
app.get('/counter', function (req, res) {
    counter = counter + 1;
    res.send(counter.toString());
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

var names = [];
app.get('/submit-name/:name', function (req, res) {
    // Get the name from request object
    var name = req.params.name;

    name.push(name);
    // JSON: Javascript Object Notation
    res.send(JSON.stringify(names));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
