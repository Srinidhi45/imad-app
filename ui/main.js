console.log('Loaded!');
// counter code
var button = document.getElementById('counter');

button.onclick = function () {
    
    
    // create the request object
    var request = XMLHttpRequest();
    
    // capture a response and store it in a variable
    request.onreadystatechange = function () {
        if(request.readystate === XMLHttpRequest.DONE){
            //Take some action
            if(request.status === 200) {

                
            }
        }
        // Not done Yet
    };
    // make the request
    request.open('GET', 'http://srinidhisrinidhisrinidhi.imad.hasura-app.io/counter', true);
    request.send(null);
    
};

// submit name

var submit = document.getElementById('submit_btn');
submit.onclick = function () {
    // create the request object
    var request = XMLHttpRequest();
    
    // capture a response and store it in a variable
    request.onreadystatechange = function () {
        if(request.readystate === XMLHttpRequest.DONE){
            //Take some action
            if(request.status === 200) {
                // captura a list of names and render it as a list
                var names = request.responseText;
                names = JSON.parse(names);
                var list = '';
                for(var i=0; i < names.length; i++) {
                     var list = '<li>' + names[i] + '</li>';
                }
                var ul = document.getElementById('namelist');
                ul.innerHTML = list;
                
            }
        }
        // Not done Yet
    };
    
    // make the request
    var nameInput = document.getElementById('name');
    var name = nameInput.value;    
    request.open('GET', 'http://srinidhisrinidhisrinidhi.imad.hasura-app.io/submit-name?name=' + name, true);
    request.send(null);    
    // make a request to the server and send the name
    
    // capture a list of names and render it as a list

};