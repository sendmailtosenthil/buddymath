/**
 * Created by svaithiyanathan on 1/3/14.
 */
var Fish = me.ObjectEntity.extend( {

    init:function () {
        var timer = [0.5,1,1.25,1.5,1.75,2,2.5,3,3.25];
        this.prop = {
            counter: 0,
            directionLeft: false,
            timeDelay : timer[Math.floor(Math.random() * timer.length)] * 10000,
            lastUpdatedTime: me.timer.getTime(),
            maxAngle: 45
        };
        x = 64, y = 64;
        settings = {};
        // define this here, since not defined in tiled
        settings.image = me.loader.getImage("small-fish");
        settings.spritewidth = 64;
        settings.spriteheight = 64;

        // call the constructor
        this.parent(x, y, settings);

        // animation
        this.renderable.addAnimation ("swim",  [0,1,2,3,4,5,6,7,8,9]);

        // set the walking & jumping speed
        this.setVelocity(0.3, 0.3);

        // set the walking & jumping speed
        this.setMaxVelocity(5, 5);

        // add friction
        this.setFriction(0.1,0.1);

        // no graviy
        this.gravity = 0;

        this.flip = true;
        // set default one
        this.renderable.setCurrentAnimation("swim");
        this.renderable.flipX(this.flip);
        this.renderable.scaleFlag = true;

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
            fish.pos.x += 2;
        }

        function moveLeft() {
            fish.pos.x -= 2;
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
    },

    /**
     * Generate random point with in the stage
     * @returns {{x: number, y: number}}
     */
    randomPosition: function(){
        var stageX = me.video.width;
        var stageY = me.video.height;
        return {
            x: Math.floor(Math.random() * stageX),
            y: Math.floor(Math.random() * stageY)
        }
    }

});

