alert("The objective of this game is to drag words to their corresponding places in the diagram.");
var w=window.innerWidth;
var h=window.innerHeight;
var o=74;
if(w>790){w=790;}
var game = new Phaser.Game(w,h, Phaser.AUTO, 'gameDiv');

function distance(x1,y1,x2,y2){
  x1=parseInt(x1);
  x2=parseInt(x2);
  y2=parseInt(y2);
  y1=parseInt(y1);
  console.log(x1,y1,x2,y2);
  d = Math.sqrt( (Math.pow(x1-x2,2)+Math.pow(y1-y2,2))  );
  d=parseInt(d);
  console.log(d);
  return d;
}


var data_string ="\
plasma\ncell\nmembrane,231,182;\
endoplasmic\nreticulum,231,182;\
nucleus,98,263;\
ribosome,45,343;\
lysosome,100,520;\
mitochondria,405,522;\
golgi,463,502;\
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
            x+=130;
        }
        function itemDragStop(item) {
              var temp = item.name.split(';');
              console.log("temp "+temp);
              console.log()
              if(distance(game.input.x,game.input.y,temp[3],temp[4]) < 50 ){
                console.log('yo');
                return;
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