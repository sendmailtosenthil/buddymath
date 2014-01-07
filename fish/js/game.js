/**
 * Created by svaithiyanathan on 1/3/14.
 */
var game = {
    /*
     * Initialize the game
     */
    onload: function()
    {
        // init the video
        if (!me.video.init("screen", 800, 350))
        {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // initialize the audio
        me.audio.init("mp3,ogg");

        // set a callback to run when loading is complete
        me.loader.onload = this.loaded.bind(this);

        // load the resources
        me.loader.preload(game.resources);

        // initialize melonJS and display a loading screen
        me.state.change(me.state.LOADING);
    },

    loaded: function(){
        console.log('All resources are loaded...');
        me.state.set(me.state.PLAY, new game.SeaScreen());
        me.entityPool.add("Fish", Fish);

        // set a global fading transition for the screen
        me.state.transition("fade", "#FFFFFF", 250);

        // disable transition for MENU and GAMEOVER screen
        me.state.setTransition(me.state.PLAY, true);

        // start the game
        me.state.change(me.state.PLAY);

    }
};