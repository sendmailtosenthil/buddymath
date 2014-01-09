/**
 * Created by svaithiyanathan on 1/3/14.
 */
game.SeaScreen = me.ScreenObject.extend({
    init: function(){
        console.log('Initializing the Menu Screen');
        this.parent(true);
    },
    onResetEvent: function(){
        me.game.add(new BackgroundObject(), 1);
        //this.font = new me.Font("Verdana",20, "red");
        for(var i in [1,2,3,4]){
            var rand = randomPosition(me.video);
            var fishProp = {
                imageId : "small-fish",
                width: 64,
                height: 64,
                action: "swim",
                frames : [{
                    action:"swim",
                    steps: [0,1,2,3,4,5,6,7,8,9]
                }],
                speedX: 2,
                speedY: 2,
                x: rand.x,
                y: rand.y
            };
            me.game.add(new Fish(fishProp), i+1);
        }
        console.log('Menu Screen reset called');
    },
    draw: function(context){
        //console.log("MS Draw event called");
        //this.font.draw(context, "Score", 100,100);
    },
    onDestroyEvent: function(){
        console.log('MS Destroy called');
    }
});

game.FishInfoScreen = me.GUI_Object.extend({

    init: function(x,y,settings){
        console.log('Initializing the Fish Info Screen');
        this.parent(true);
    },

    draw: function(context){
        console.log("draw");
        this.font.draw(context, "Score : ", this.pos.x, this.pos.y);
    }
});