var five = require("johnny-five");
var board = new five.Board({port: process.argv[2]});
var speed = 100;
var threshold = 200;

board.on("ready", function() {

  l_motor = new five.Motor({pins: {pwm: 6, dir: 7}});
  r_motor = new five.Motor({pins: {pwm: 5, dir: 4}});



  // Create a new `reflectance` hardware instance.
  var eyes = new five.IR.Reflect.Array({
    emitter: 13,
    pins: ["A3", "A2"], // any number of pins
    freq: 10,
    autoCalibrate: true,
  });

  eyes.on('data', function() {


    var sensor_right = this.raw[0];
    var sensor_left = this.raw[1];

    if(sensor_left < threshold && sensor_right < threshold) {
      r_motor.forward(speed);
      l_motor.reverse(speed);
      console.log( "Vooruit");
    } else if (sensor_left < threshold){
      l_motor.forward(speed);
      r_motor.forward(speed);
            console.log( "Links");
    } else if (sensor_right < threshold){
      r_motor.reverse(speed);
      l_motor.reverse(speed);
      console.log( "Rechts");
    } else {
      l_motor.forward(speed);
      r_motor.reverse(speed);
            console.log( "Achteruit");
    }
  });

  eyes.enable();
});
