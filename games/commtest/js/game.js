var game = {
    state: "0",
    setupGame: function() {
        console.log('setupGame');
        this.state = "" + Math.random();
        console.log(this.state);
        return this.state;
    },
    joinGame: function(map_data) {
        console.log('joinGame');
        this.state = map_data;
        console.log(this.state);
        return;
    },
    applyTurn: function(turn_data, done) {
        this.state += turn_data;
        console.log('turn starting: ', this.state);
        var my_turn_data = prompt("enter your turn: ");
        this.state += my_turn_data;
        console.log('turn done: ', this.state);
        done(my_turn_data);
    },
}
