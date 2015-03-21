var w=window.innerWidth;
var h=window.innerHeight;
var o=74;
if(w>600){w=600;}
var game = new Phaser.Game(w,h, Phaser.AUTO, 'gameDiv');

function calcCrow(lat1, lon1, lat2, lon2) 
    {
      var R = 6371; // km
      var dLat = toRad(lat2-lat1);
      var dLon = toRad(lon2-lon1);
      var lat1 = toRad(lat1);
      var lat2 = toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    }

function toRad(Value) 
    {
        return Value * Math.PI / 180;
    }
var data_string ="\
label 1,206,182;\
label 2,98,263;\
label 3,45,343;\
label 4,100,520;\
label 5,405,522;\
label 6,463,502;\
label 7,488,442\
";
var random_item;
var data_arr=[];

var mainState = {

    preload: function() {
        game.stage.backgroundColor = '#71c5cf';

        var temp = data_string.split(';');
        for(i=0;i<temp.length;i++){
            data_arr.push(temp[i].split(","));
        }

        random_item = data_arr[Math.floor(Math.random()*data_arr.length)];
        console.log(data_arr);
        game.load.image('diagram', 'assets/img/diagram.png');

    },

    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.bird = this.game.add.sprite(0, 100, 'diagram');
        options = game.add.group();
        var x=10,y=10;
        for(i=0;i<data_arr.length-1;i++){
            options.add(this.game.add.text(x,y,data_arr[i][0], { font: "15px Arial", fill: "#ffffff" }));
            x+=100;
        }
        function itemDragStop(item) {
              var temp = item.name.split(';');
              console.log(temp);
              if(distance(game.input.mousePointer.x,game.input.mousePointer.y,temp[3],temp[4])){
                if(random_item[1] == temp[0]){
                    console.log("correct");
                    item.x=w/2;
                    item.y=70;
                    item.scale.x=2.5;
                    item.scale.y=3.5;
                    //alert("Well Done !!");
                    //game.state.start('main');
                    return;
                }

              }
              var temp = item.name.split(';');
              //console.log("moving to " + temp[1]+","+temp[2]);
              item.x=temp[1];
              item.y=temp[2];
            };

        var i=0;
        options.forEach(function (item) {
              item.inputEnabled = true;
              item.input.enableDrag(true, true);
              item.events.onDragStop.add(itemDragStop);
              item.scale.x=1.5;
              item.scale.y=1.5;
              item.name=i++ + ";"+item.x+";"+item.y+";";
              item.name+= data_arr[i][1] +";" +data_arr[i][2]; 
              console.log(item.x,item.y);
            });
    },

    update: function() {
        //console.log(game.input.mousePointer.x+","+game.input.mousePointer.y)
    }
};

game.state.add('main', mainState);
game.state.start('main');