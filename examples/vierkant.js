var five = require("johnny-five");

var max_speed_l = 255;
var max_speed_r = 255;

// set up the input
var stdin = process.stdin;
stdin.setRawMode(true);

var board = new five.Board({port: process.argv[2]});

var l_motor = r_motor = null;

board.on("ready", function(err) {

    if (err){
        console.log(err);
        return;
    }
    l_motor = new five.Motor({pins: {pwm: 6, dir: 7}});
    r_motor = new five.Motor({pins: {pwm: 5, dir: 4}});

    console.info("Board connected. Robot set up. Press space to start.");

});