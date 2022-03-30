
var socket = io();

// TODO: Cause the event joining message on the reception of a name
socket.emit('join', name) //from the html document


// if form is submitted, cause a chat message event
$('form').submit(function(e) {
    // will prevent page reloading
    e.preventDefault();

    // TODO: sending the name of the writer with the value of the form as a chat message
    //the value of the emit is the id of the DOM
    socket.emit('message', name+ ': ' + $('#m').val()); //#m is the form that translates the message over 

    // Add a list item with what you say on your screen
    $('#messages').append($('<li id="list">').text('You:  ' + $('#m').val()));
    // blank out the send message bar to have another message come in
    $('#m').val('');
    // have to return a boolean value
    return false;
});

// TODO: if a chat message event happens ("comes in"), take that message and add it to the displayed messages
socket.on('message', (message) => {
    $('#messages').append($('<li>').text(message));
}); 