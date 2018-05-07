// Create a client instance
var clientId  = 'a:9fc2hw:'+Math.random().toString(16).substr(2, 8);
client = new Paho.MQTT.Client("9fc2hw.messaging.internetofthings.ibmcloud.com", 1883, clientId);

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
        alert("Connected");
    },
    // Gets Called if the connection could not be established
    onFailure: function (message) {
        alert("Connection failed: " + message.errorMessage);
    }
};

// connect the client
client.connect(options);

// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("World");
  message = new Paho.MQTT.Message("Hello");
  message.destinationName = "World";
  client.send(message);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
  document.getElementById("sensorvalue").innerHTML = message.payloadString
}
