// Create a client instance
var clientId  = 'a:9fc2hw:'+Math.random().toString(16).substr(2, 8);
client = new Paho.MQTT.Client("9fc2hw.messaging.internetofthings.ibmcloud.com", 1883, clientId);

function displayMagnitude(size, elem) {
  mag_offset_x = 200;
  mag_offset_y = 200;
  pos_l = mag_offset_x - size/2;
  pos_t = mag_offset_y - size/2;
  // elem.style.left = pos_l;
  // elem.style.top = pos_t;
  size /= 500;
  elem.style.transform = "scale("+size+")";
  // elem.style.height = size + "px";
  // elem.style.width = size + "px";
}



// size = 400;
// displayMagnitude(size, myimg);

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

//Connect Options
var options = {
    userName: "a-9fc2hw-eis5mfhkgm",
    password: "3dvSTlJegU89ojQmQY",
    timeout: 6,
    // Gets Called if the connection has sucessfully been established
    onSuccess: function () {
        client.subscribe("iot-2/type/Accelerometer/id/+/evt/+/fmt/+");
        //alert("Connected");
        console.log("Successfully connected to server!");
    },
    // Gets Called if the connection could not be established
    onFailure: function (message) {
        // alert("Connection failed: " + message.errorMessage);
        console.log("Connection failed!" + message.errorMessage);
    }
};

// connect the client
client.connect(options);

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
  var parsed = JSON.parse(message.payloadString)
  console.log("obj is " + parsed);
  var mag = Math.abs(parseInt(parsed.x)) +
            Math.abs(parseInt(parsed.y)) +
            Math.abs(parseInt(parsed.z));
  console.log("magnitude is " + mag);
  const modifier = 100;
  var newsize = (mag / 25000) * modifier;
  var max_value = 600;
  newsize = newsize > max_value ? max_value : newsize;
  // Get the images and render
  var emil = document.getElementById("emil");
  if (emil != null){
    displayMagnitude(newsize, emil);
  }
  var myimg = document.getElementById("mag_circle_1");
  if (myimg != null){
    console.log("myimg was found!");
    displayMagnitude(newsize, myimg);
  }
  document.getElementById("sensorvalue").innerHTML = message.payloadString;
}
