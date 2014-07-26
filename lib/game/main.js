ig.module(
    'game.main'
)
.requires(
    'plugins.splitscreen',
    'game.entities.player',
    'game.levels.simple',
    'impact.game',
    'impact.debug.debug',
    'impact.font'
)
.defines(function(){

MyGame = ig.Game.extend({

    // Load a font
    font: new ig.Font( 'media/04b03.font.png' ),

    // Enable gravity.
    gravity: 200,

    init: function() {
        this.parent();

        // Bind keys.
        ig.input.bind( ig.KEY.UP_ARROW, 'up' );
        ig.input.bind( ig.KEY.DOWN_ARROW, 'down' );
        ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
        ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
        ig.input.bind( ig.KEY.W, 'up' );
        ig.input.bind( ig.KEY.D, 'down' );
        ig.input.bind( ig.KEY.A, 'left' );
        ig.input.bind( ig.KEY.D, 'right' );
        ig.input.bind(ig.KEY.MOUSE1, 'mouse1');
        ig.input.bind(ig.KEY.MOUSE2, 'mouse2');

        this.loadLevel(LevelSimple);

        // Add the player to the level.
        var playerStart = this.getEntitiesByType(EntityPlayerStart)[0];
        this.player = this.spawnEntity(EntityPlayer, playerStart.pos.x, playerStart.pos.y);
        playerStart.kill();
    },

    update: function() {
        this.parent();
    },

    draw: function() {
        this.parent();
    }
});


// Start the game.
ig.main( '#canvas', MyGame, 60, 240, 160, 3 );

});
