/**
 * Created by svaithiyanathan on 1/3/14.
 */
var Fish = me.ObjectEntity.extend( {

    init:function (fishSettings) {
        var timer = [0.5,1,1.25,1.5,1.75,2,2.5,3,3.25];
        this.prop = {
            directionLeft: false,
            timeDelay : timer[Math.floor(Math.random() * timer.length)] * 10000,
            lastUpdatedTime: me.timer.getTime(),
            maxAngle: 45
        };
        //x = 64, y = 64;
        var settings = {};
        // define this here, since not defined in tiled
        settings.image = me.loader.getImage(fishSettings.imageId);
        settings.spritewidth = fishSettings.width;
        settings.spriteheight = fishSettings.height;

        // call the constructor
        this.parent(fishSettings.x, fishSettings.y, settings);

        // animation
        console.log(fishSettings.frames);
        for(var i = 0; i< fishSettings.frames.length; i++){
            this.renderable.addAnimation (fishSettings.frames[i].action, fishSettings.frames[i].steps);
        }

        // set the walking & jumping speed
        //this.setVelocity(0.3, 0.3);

        // set the walking & jumping speed
        //this.setMaxVelocity(5, 5);

        // add friction
        //this.setFriction(0.1,0.1);

        // no graviy
        //this.gravity = 0;

        //this.flip = true;
        // set default one
        this.renderable.setCurrentAnimation(fishSettings.action);
        this.renderable.flipX(true);
        this.renderable.scaleFlag = true;

        this.prop.speedX = fishSettings.speedX;
        this.prop.speedY = fishSettings.speedY;
        /*this.scalingRatioCounter = 1;
        this.scaleRatio = 0.5;*/
    },

    /* -----
     update the player pos
     ------                        */
    update : function () {
        /*this.scalingRatioCounter++
        if(this.scalingRatioCounter % 7 == 0){
            this.renderable.resize(this.scaleRatio);
            this.scaleRatio += 0.1;
        }*/

        this.updateMovement();
        return this.parent();
    },

    updateMovement: function(){
        var fish = this;

        //The current position of the fish and its width is less then game width then move to left
        //reached right corner
        function moveRight() {
            fish.pos.x += fish.prop.speedX;
        }

        function moveLeft() {
            fish.pos.x -= fish.prop.speedY;
        }

        function isMovingTowardsLeft() {
            return fish.prop.directionLeft;
        }

        function isMovingTowardsRight() {
            return !isMovingTowardsLeft();
        }

        function isLeftExtreme() {
            return fish.pos.x < 0;
        }

        function isRightExtreme() {
            return fish.pos.x + fish.width >= me.video.getWidth();
        }

        function changeDirection(flag){
            fish.renderable.flipX(!flag);
            fish.prop.directionLeft = flag;
        }

        if(isRightExtreme()){
            //console.log('Right Extreme');
            changeDirection(true);
        }
        if(isLeftExtreme()){
            //console.log('Left Extreme');
            changeDirection(false);
        }
        if(isMovingTowardsLeft()){
            //console.log('Move Left');
            moveLeft();
        }
        if(isMovingTowardsRight()){
            //console.log('Move Right');
            moveRight();
        }

        fish.updateAngle();
    },

    /**
     * Method to update the direction of the fish. The angle of fish is always between 0 to 45 deg.
     */
    updateAngle: function(){
        if(this.isChangeRequired()){
            var random = Math.ceil(Math.random() * this.prop.maxAngle);
            this.renderable.angle = Number.prototype.degToRad(random);
            this.prop.lastUpdatedTime = me.timer.getTime();
        }
    },

    /**
     * Check whether angle rotation is really required for this update canvas
     * @returns {boolean}
     */
    isChangeRequired: function(){
        return me.timer.getTime()-this.prop.lastUpdatedTime > this.prop.timeDelay;
    }

});
