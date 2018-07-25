var attempts = 12;
console.log(attempts);
var pattern = [];

function sendText(id1, id2, id3, id4, socket) {
  var a = document.getElementById(id1)
  var color_1 = a.options[a.selectedIndex].value
  var b = document.getElementById(id2)
  var color_2 = b.options[b.selectedIndex].value
  var c = document.getElementById(id3)
  var color_3 = c.options[c.selectedIndex].value
  var d = document.getElementById(id4)
  var color_4 = d.options[d.selectedIndex].value

  msg = "GUESS" + "," + color_1 + "," + color_2 + "," + color_3 + "," + color_4 + "," + pattern[1] + "," + pattern[2] + "," + pattern[3] + "," + pattern[4]
  console.log(msg);
  console.log(pattern)
  socket.send(msg)
}

$(document).ready(function() {
    var socket = io.connect('http://127.0.0.1:5000');
    socket.on('connect', function() {
      document.getElementById("Color-1").style.visibility = "visible";
      document.getElementById("Color-2").style.visibility = "visible";
      document.getElementById("Color-3").style.visibility = "visible";
      document.getElementById("Color-4").style.visibility = "visible";
      document.getElementById("sendbutton").style.visibility = "visible";
      document.getElementById("txtWin").style.visibility = "hidden";
      document.getElementById("buttonWin").style.visibility = "hidden";
      document.getElementById("txtGameOver").style.visibility = "hidden";
      document.getElementById("buttonGameOver").style.visibility = "hidden";
    });
    socket.on('message', function(msg) {
        $("#messages").append('<li>'+msg+'</li>');
        var s_msg = msg.split(",");
        if (s_msg[0] == "PATTERN") {
            pattern = s_msg;
            console.log("pattern")
        } else if (s_msg[0] == "WIN") {
          document.getElementById("txtWin").style.visibility = "visible";
          document.getElementById("buttonWin").style.visibility = "visible";
          document.getElementById("Color-1").style.visibility = "hidden";
          document.getElementById("Color-2").style.visibility = "hidden";
          document.getElementById("Color-3").style.visibility = "hidden";
          document.getElementById("Color-4").style.visibility = "hidden";
          document.getElementById("sendbutton").style.visibility = "hidden";
            console.log("Win")
        };
        console.log("MSG RECIEVED");
    });
    $('#sendbutton').on('click', function() {
        if (attempts == 0) {
          socket.send("GAME_OVER");
          document.getElementById("txtGameOver").style.visibility = "visible";
          document.getElementById("buttonGameOver").style.visibility = "visible";
          document.getElementById("Color-1").style.visibility = "hidden";
          document.getElementById("Color-2").style.visibility = "hidden";
          document.getElementById("Color-3").style.visibility = "hidden";
          document.getElementById("Color-4").style.visibility = "hidden";
          document.getElementById("sendbutton").style.visibility = "hidden";
        } else {
          $("#messages").append('<li>'+attempts+'</li>');
          attempts--;
          sendText("Color-1", "Color-2", "Color-3", "Color-4", socket);
        };
    });
});