var attempts = 12;
var num_guess = 0;
var pattern = [];
// console.log(attempts);

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
  
  $("#p-historic").append('<p>'+"Guess "+num_guess+": "+color_1+" - "+color_2+" - "+color_3+" - "+color_4+'</p>');

  socket.send(msg)
}

$(document).ready(function() {
    var socket = io.connect('http://127.0.0.1:5000');
    socket.on('connect', function() {
      document.getElementById("id-tittle").style.display = "block";
      document.getElementById("id-guess").style.display = "block";
      document.getElementById("id-right").style.display = "block";
      document.getElementById("id-historic").style.display = "block";
      document.getElementById("id-loss").style.display = "none";
      document.getElementById("id-win").style.display = "none";
      console.log("Socket connected")
    });
    socket.on('message', function(msg) {
        var s_msg = msg.split(",");
        if (s_msg[0] == "PATTERN") {
            pattern = s_msg;
            console.log(pattern)
        } else if (s_msg[0] == "WIN") {
          document.getElementById("id-tittle").style.display = "none";
          document.getElementById("id-guess").style.display = "none";
          document.getElementById("id-right").style.display = "none";
          document.getElementById("id-historic").style.display = "none";
          document.getElementById("id-loss").style.display = "none";
          document.getElementById("id-win").style.display = "block";
          console.log("Win")
        } else if (s_msg[0] == "RESPONSE"){
          document.getElementById("messages").innerHTML = "";
          $("#messages").append('<p> Pegs found: </p>'+'<p>'+"Black: "+ s_msg[1]+'</p>'+'<p>'+"White: "+s_msg[2]+'</p>');
        };
        // console.log("MSG RECIEVED");
    });
    $('#sendbutton').on('click', function() {
        if (attempts == 0) {
          socket.send("GAME_OVER");
          document.getElementById("id-tittle").style.display = "none";
          document.getElementById("id-guess").style.display = "none";
          document.getElementById("id-right").style.display = "none";
          document.getElementById("id-historic").style.display = "none";
          document.getElementById("id-loss").style.display = "block";
          document.getElementById("id-win").style.display = "none";
        } else {
          document.getElementById("attempts").innerHTML = "";
          $("#attempts").append('<p>'+"Attepmts left: "+attempts+'</p>');
          attempts--;
          num_guess++;
          sendText("Color-1", "Color-2", "Color-3", "Color-4", socket);
        };
    });
});