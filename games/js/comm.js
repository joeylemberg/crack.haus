var conn;
var startgame = function() {
    console.log('start game');
    var peer = new Peer({key: "lwjd5qra8257b9"});
    peer.on('open', function(id) {
        console.log('My peer ID is: '+id);
    });
    var initData = {type: 'init', data: game.setupGame()};
    peer.on('connection', function(new_conn) {
        console.log("another player joined");
        conn = new_conn;
        conn.on('data', function(data) {
            var turnDone = function(data) {
                conn.send({type: 'turn', data: data});
            }
            if (data.type == 'init') {
                console.log('received init data');
            } else {
                console.log('received other data');
                game.applyTurn(data.data, turnDone);
            };
        });
        conn.on('open', function() {
            console.log('sending initial data: ', initData);
            conn.send(initData);
        }); 
    });
};

var joingame = function() {
    console.log('join game');
    var peer_id = prompt("Please enter the other player's peer id:", 'peer id');
    var peer = new Peer({key: 'lwjd5qra8257b9'});
    conn = peer.connect(peer_id);
    conn.on('data', function(data) {
        var turnDone = function(data) {
            conn.send({type: 'turn', data: data});
        }
        if (data.type == 'init') {
            console.log('received init data');
            game.joinGame(data.data);
            console.log('sending first turn');
            conn.send({type: 'turn', data: "0"});
        } else if (data.type == 'turn') {
            console.log('received turn data');
            game.applyTurn(data.data, turnDone);
        }
    });
};

