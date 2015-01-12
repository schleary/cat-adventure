var Room = function (new_name, new_description, new_run_description, new_look_description, new_heading, new_exits, new_id, new_points) {
  this.name = new_name;
  this.description = new_description;
  this.run_description = new_run_description;
  this.look_description = new_look_description;
  this.heading = new_heading;
  this.exits = new_exits;
  this.points = new_points;
  this.id = new_id;
  this.getDescription = function(){
    return this.name + ": " + this.description
  };
};

//
// Begin fixture data!
//
var rooms = [];
rooms.push(new Room(
  "Kitchen",
  "A nice roomy kitchen. Not very safe. There may be dogs nearby.",
  "Runs towards the kitchen",
  "Look at the kitchen",
  "Oh no! Starbuck is trapped in the kitchen!",
  ["Living Room", "Dining Room"],
  "kitchen",
  0
));

rooms.push(new Room(
  "Living Room",
  "Lots of perches, but frequently full of dogs. Kind of safe, but not a good spot for naps!",
  "Runs towards the living room",
  "Look at the living room",
  "Safe for now. But for how long???"
  ["Kitchen"],
  "living-room",
  2
));

rooms.push(new Room(
  "Dining Room",
  "There's a big table and some chairs and OH NO IT'S A DOG",
  "Runs towards the dining room",
  "Look at the dining room",
  "Run, Starbuck, run!"
  ["Kitchen", "Bedroom"],
  "dining-room",
  -4
));

rooms.push(new Room(
  "Bedroom",
  "YAY! We finally found the nice toasty warm sunbeam!",
  "Runs towards the bedroom",
  "Look at the bedroom",
  "Finally, Starbuck is safe at last!!"
  ["Stairs"],
  "bedroom",
  20
));

var findRoom = function(roomName){
  for(var i=0;i<rooms.length;i++){
    if(rooms[i].name == roomName){
      return rooms[i];
    }
  }
  return undefined;
};

var setupRoom = function(room){

  document.ready.getByElementId("heading") = room.heading;


  $("#"+room.id+" .look").click(function() {
    alert( room.getDescription() );
  });

  $("#"+room.id+" .run").click(function() {
    var new_rooms_html = "";
    var adjacent_rooms = [];
    for(var i=0;i<room.exits.length;i++){
      var adjacent_room = findRoom(room.exits[i]);
      adjacent_rooms.push(adjacent_room);
      if(adjacent_room !== undefined){
        new_rooms_html += "<div id='" + adjacent_room.id + "'> <span class='run'>" +adjacent_room.run_description +
           "</span> <span class='look'>" + adjacent_room.look_description + "</span></div>";
      }
    }
    $("#rooms").html(new_rooms_html);
    for(var i=0;i<adjacent_rooms.length;i++){
      setupRoom(adjacent_rooms[i]);
    }
  });
};

//
// End fixture data!
//

// don't forget to populate this with data!
// var starbuck = new Cat();

$(document).ready(function(){
    for(var i=0;i<rooms.length;i++){
      setupRoom(rooms[i]);
    }
});
