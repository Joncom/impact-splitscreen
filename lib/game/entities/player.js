ig.module('game.entities.player')
.requires('impact.entity')
.defines(function() {

    EntityPlayer = ig.Entity.extend({

        size: { x: 8, y: 8 },
        speed: { x: 95, y: 195 },
        maxVel: { x: 110, y: 200 },
        friction: { x: 300, y: 0 },
        facingLeft: false,
        gravityFactor: 3,
        animSheet: new ig.AnimationSheet('media/players.png', 8, 8),

        init: function(x, y, settings) {
            this.parent(x, y, settings);

            // Set appearance.
            var index;
            var playerNum = parseInt(this.name.charAt(1));
            if(playerNum !== parseInt(playerNum)) {
                index = 0;
            } else {
                index = playerNum - 1;
            }
            this.addAnim('idle', 1, [index]);
        },

        update: function() {
            this.parent();

            // Set camera to follow this entity.
            var playerNum = parseInt(this.name.charAt(1));
            var screenIndex = playerNum - 1;
            var screen = ig.game.screens[screenIndex];
            screen.camera.x = this.pos.x + this.size.x/2 - screen.size.x/2;
            screen.camera.y = this.pos.y + this.size.y/2 - screen.size.y/2;

            if(this.standing) {
                if(ig.input.pressed(this.name + '_up')) {
                    this.vel.y = -this.speed.y;
                    this.falling = false;
                }

            } else {

                // we're not standing, jump has been released and we're not falling
                // we reduce the y velocity and mark us as falling
                if(!this.standing && !ig.input.state(this.name + '_up') && !this.falling) {
                    this.vel.y = Math.floor(this.vel.y / 2);
                    this.falling = true;
                }
            }

            if(ig.input.state(this.name + '_left')) {
                this.vel.x = -this.speed.x;
            } else if(ig.input.state(this.name + '_right')) {
                this.vel.x = this.speed.x;
            } else {
                this.accel.x = 0;
            }
        }

    });
});