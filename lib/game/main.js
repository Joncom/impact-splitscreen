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
        ig.input.bind( ig.KEY.W, 'p1_up' );
        ig.input.bind( ig.KEY.D, 'p1_down' );
        ig.input.bind( ig.KEY.A, 'p1_left' );
        ig.input.bind( ig.KEY.D, 'p1_right' );
        ig.input.bind( ig.KEY.I, 'p2_up' );
        ig.input.bind( ig.KEY.K, 'p2_down' );
        ig.input.bind( ig.KEY.J, 'p2_left' );
        ig.input.bind( ig.KEY.L, 'p2_right' );
        ig.input.bind( ig.KEY.UP_ARROW, 'p3_up' );
        ig.input.bind( ig.KEY.DOWN_ARROW, 'p3_down' );
        ig.input.bind( ig.KEY.LEFT_ARROW, 'p3_left' );
        ig.input.bind( ig.KEY.RIGHT_ARROW, 'p3_right' );
        ig.input.bind( ig.KEY.NUMPAD_8, 'p4_up' );
        ig.input.bind( ig.KEY.NUMPAD_5, 'p4_down' );
        ig.input.bind( ig.KEY.NUMPAD_4, 'p4_left' );
        ig.input.bind( ig.KEY.NUMPAD_6, 'p4_right' );

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
