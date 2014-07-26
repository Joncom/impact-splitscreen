ig.module('plugins.splitscreen')
.requires('impact.system', 'impact.game')
.defines(function(){

    ig.Game.inject({

        screens: [],

        init: function() {
            for(var i=0; i<2; i++) {

                var width = ig.system.width / 2;
                var height = ig.system.height;
                var realWidth = width * ig.system.scale;
                var realHeight = height * ig.system.scale;

                var canvas = ig.$new('canvas');
                canvas.width = realWidth;
                canvas.height = realHeight;

                var context = canvas.getContext('2d');

                var screen = {
                    camera: { x: 0, y: 0 },
                    size: { x: width, y: height }
                };

                ig.system.canvases.push(canvas);
                ig.system.contexts.push(context);
                this.screens.push(screen);
            }
        },

        draw: function(){

            if( this.clearColor ) {
                ig.system.clear( this.clearColor );
            }

            var origSystemWidth = ig.system.width;
            var origSystemHeight = ig.system.height;
            var origSystemRealWidth = ig.system.realWidth;
            var origSystemRealHeight = ig.system.realHeight;
            var origCanvas = ig.system.canvas;
            var origContext = ig.system.context;

            var scale = ig.system.scale;
            var screenCount = ig.system.canvases.length;
            for(var i=0; i<screenCount; i++) {
                var screen = this.screens[i];
                this.screen.x = screen.camera.x;
                this.screen.y = screen.camera.y;
                ig.system.width = screen.size.x;
                ig.system.height = screen.size.y;
                ig.system.realWidth = ig.system.width * scale;
                ig.system.realHeight = ig.system.height * scale;
                ig.system.canvas = ig.system.canvases[i];
                ig.system.context = ig.system.contexts[i];
                this.parent();
            }

            // Restore original settings.
            ig.system.width      = origSystemWidth;
            ig.system.height     = origSystemHeight;
            ig.system.realWidth  = origSystemRealWidth;
            ig.system.realHeight = origSystemRealHeight;
            ig.system.canvas     = origCanvas;
            ig.system.context    = origContext;

            // Draw individual canvases on main canvas.
            for(var i=0; i<screenCount; i++) {
                var canvas = ig.system.canvases[i];
                var x = 0;
                var y = 0;
                ig.system.context.drawImage(canvas, x, y);
            }
        }
    });


    ig.System.inject({
        canvases: [],
        contexts: []
    });

});
