
function wrap( val,  minVal,  maxVal)
{
    val -= minVal;
    
    var delta = maxVal - minVal;
    if ( delta < 0.0001 ) return val;

    return val - (delta* Math.floor(val/delta)) + minVal;
}

function App()
{
    this.Init = function()
    {
        this.time = 0.0;
    }

    this.Update = function()
    {
        this.time += 1.0 / 60.0;
    }

    this.Render = function()
    {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

    	/*ctx.globalAlpha= 0.05;
        ctx.fillStyle = "#FF05A5";
        ctx.fillRect( 0, 0, canvas.width, canvas.height );
    	ctx.globalAlpha= 1.0;*/

        var delta_lines = 70.0;
        var num_lines = Math.max( canvas.width, canvas.height ) / delta_lines;
        var center_x = canvas.width * 0.5;
        var center_y = canvas.height * 0.5;
        var offset = wrap( this.time*100.0, 0.0, delta_lines );

         ctx.strokeStyle = "#FFFFFF";
        ctx.beginPath();

        for ( var i = 0; i < num_lines; i++ )
        {
            var dist = i * delta_lines + offset;

            ctx.moveTo( center_x + dist, center_y );
            ctx.lineTo( center_x, center_y + dist );
            ctx.lineTo( center_x -dist, center_y );
            ctx.lineTo( center_x, center_y -dist );
            ctx.lineTo( center_x + dist, center_y );

        }

        ctx.stroke();
    }
}

//////////////////////////////////////////

var canvas;
var ctx;
var canvas;

// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

(function() 
{
        canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d');

        // resize the canvas to fill browser window dynamically
        window.addEventListener('resize', resizeCanvas, false);
        
        function resizeCanvas() 
        {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
        }
        resizeCanvas();
})();

var g_app = new App();
g_app.Init();

(function animloop(){
  requestAnimFrame(animloop);
  g_app.Update();
  g_app.Render();
})();
