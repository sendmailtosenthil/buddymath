/**
 * Created by svaithiyanathan on 1/3/14.
 */

/*
 * background layer
 */
var BackgroundLayer = me.ImageLayer.extend({
    /*
     * constructor
     */
    init: function(image, speed){
        name = image;
        width = 1000;
        height = 450;
        z = 1;
        ratio = 1.0;
        this.speed = speed;
        console.log('width, height', width,',' ,height);
        // call parent constructor
        this.parent(name, width, height, image, z, {x:1,y:2});

        //this.imageheight = 350;
    },

    /*
     * update function
     */
    update: function(){

        // recalibrate image position
        if (this.pos.x >= this.imagewidth - 1)
            this.pos.x = 0;

        // increment horizontal background position
        this.pos.x += this.speed;

        return true;
    }
});

/*
 * parallax background
 */
var BackgroundObject = Object.extend({
    /*
     * constructor
     */
    init: function(){
        me.game.add(new BackgroundLayer("sea-back1", 0.4), 1); // layer 1
        me.game.add(new BackgroundLayer("sea-back2", 1.5), 2); // layer 2
        me.game.add(new BackgroundLayer("sea-back3", 2.6), 3); // layer 3
        //me.game.add(new BackgroundLayer("sea-bubble", 4), 4); // layer 2
    },

    /*
     * update function
     */
    update: function(){
        console.log('BGO update');
        return true;
    }
});