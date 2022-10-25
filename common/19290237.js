var gl;
var theta = 0;
var thetaLoc;
var direction = 1;
var degreeofTheta = 0.1;
var speed = 10;
var redColor;
var greenColor;
var blueColor;
var transparencyValue;
var resetFlag = 1;
var timeOut;
var interval2;
var scaleLoc;
var translatexLoc;
var translateyLoc;
var scale = 25;
var translateX = 0;
var translateY = 0;
var rotationFlag = false;
var cdFlag = true;
var vPosLoc;
var resetFlag = false;



window.onload = function init() {


  const canvas = document.querySelector("#glcanvas");
   gl = canvas.getContext("webgl");
  if (!gl) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }

   var program =  initShaders(gl,"vertex-shader","fragment-shader");
   gl.useProgram( program );

/////////////////////////////////////////////////////////////

   var vertices = [
      vec2(-0.6,0.3),vec2(-0.6,-0.3),vec2(-0.5,-0.3), //
      vec2(-0.6,0.3),vec2(-0.5,0.3),vec2(-0.5,-0.3),  //
      vec2(-0.5,0.0),vec2(-0.2,0.3),vec2(-0.1,0.3),   //    K HARFİ
      vec2(-0.5,0.0),vec2(-0.4,0.0),vec2(-0.1,0.3),   //
      vec2(-0.5,0.0),vec2(-0.2,-0.3),vec2(-0.1,-0.3), //
      vec2(-0.5,0.0),vec2(-0.4,0.0),vec2(-0.1,-0.3),  //
                                                      //       
      vec2(0.1,0.3),vec2(0.1,-0.3),vec2(0.2,-0.3),    //
      vec2(0.1,0.3),vec2(0.2,0.3),vec2(0.2,-0.3),     //
      vec2(0.2,0.3),vec2(0.2,0.15),vec2(0.5,-0.3),    //    N HARFİ
      vec2(0.2,0.3),vec2(0.5,-0.15),vec2(0.5,-0.3),   //
      vec2(0.5,0.3),vec2(0.5,-0.3),vec2(0.6,-0.3),    //
      vec2(0.5,0.3),vec2(0.6,0.3),vec2(0.6,-0.3)      //
      ];

/////////////////////////////////////////////////////////////


   var bufferId = gl.createBuffer();
   gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
   gl.bufferData( gl.ARRAY_BUFFER,flatten(vertices), gl.STATIC_DRAW );

   // Associate out shader variables with our data buffer
   var vPosition = gl.getAttribLocation( program, "vPosition" );
   gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
   gl.enableVertexAttribArray( vPosition );


/////////////////////////////////////////////////////////////

   redColor = gl.getUniformLocation(program,"red");
   red = 0.0;
   greenColor = gl.getUniformLocation(program,"green");
   green = 0.0;
   blueColor = gl.getUniformLocation(program,"blue");
   blue = 0.0;
   transparencyValue = gl.getUniformLocation(program,"transparency");
   transparency = 1.0;

   thetaLoc = gl.getUniformLocation(program, "theta");
   scaleLoc = gl.getUniformLocation(program,"scale");
   translatexLoc = gl.getUniformLocation(program,"translateX");
   translateyLoc = gl.getUniformLocation(program,"translateY");


/////////////////////////////////////////////////////////////

   gl.clearColor(0.0,0.0,0.0,0.0);

/////////////////////////////////////////////////////////////

   document.getElementById("redSlider").onchange = function() 
   {
      red=this.value;
   }
   document.getElementById("greenSlider").onchange = function() 
   {
      green=this.value;
   }
   document.getElementById("blueSlider").onchange = function() 
   {
      blue=this.value;
   }
   document.getElementById("transparencySlider").onchange = function() 
   {
      transparency=this.value;
   }

   document.getElementById("speedSlider").onchange = function() 
   {
      speed=this.value;
   }

/////////////////////////////////////////////////////////////

   document.getElementById("rotation").onclick = function () 
   {
      rotationFlag = true;
   }

/////////////////////////////////////////////////////////////

   document.getElementById("stop").onclick = function () 
   {
      rotationFlag = false;
   }

/////////////////////////////////////////////////////////////

   document.getElementById("directionR").onclick = function () 
   {
      if(rotationFlag == true)
      {
         if(direction > 0)
         {
            direction *= -1;
         }
      } 
      else 
      {
         rotate(-1);
      }
   }

/////////////////////////////////////////////////////////////

   document.getElementById("directionL").onclick = function () 
   {
      if(rotationFlag == true)
      {
         if(direction < 0)
         {
            direction *= -1;
         }
      } 
      else 
      {
         rotate(1);
      }
   }

/////////////////////////////////////////////////////////////

   document.getElementById("reset").onclick = function () 
   {
      resetFlag = true;
      clearInterval(interval2);
      rotationFlag = false;
      cdFlag = true;
      speed = 10;
   }

/////////////////////////////////////////////////////////////

   document.onkeydown = function(e) 
   {
      switch (e.key) {
         case "u":
            case "U":
               scale += 1;
         break;
         case "d":
            case "D":
               if(scale -1 > 0) 
               {
                  scale -=1;
               }
         break;
         case "ArrowLeft":
            translateX -= 0.1; 
         break;
         case "ArrowRight":
            translateX += 0.1;
         break;
         case "ArrowUp":
            translateY += 0.1; 
         break;
         case "ArrowDown":
            translateY -= 0.1;
         break;
      }
   }

/////////////////////////////////////////////////////////////

   const cd = document.getElementById("rcg");
   cd.addEventListener("click", function () 
   {
      if(cdFlag == true)
      {
         interval2 = setInterval(() => {
            red = getRandomNumber();
            green = getRandomNumber();
            blue = getRandomNumber();
         }, 500);
         cdFlag = false;
      } 
   })

/////////////////////////////////////////////////////////////

   const cdstop = document.getElementById("rcgstop");
   cdstop.addEventListener("click", function () 
   {
      clearInterval(interval2);
      cdFlag = true;
   })
      
/////////////////////////////////////////////////////////////

   render();
   
}


function render()
{ 

   gl.clear(gl.COLOR_BUFFER_BIT);


   if(rotationFlag == true)
   {
      theta += 0.1*direction;
	   gl.uniform1f(thetaLoc, theta);
   } 
   else 
   {
      clearTimeout(timeOut);
   }

   if(resetFlag == true)
   {
      red = 0;green = 0; blue = 0;transparency = 1;
      scale = 25; translateX = 0; translateY = 0;
      resetFlag = false;
      theta = 0;
	   gl.uniform1f(thetaLoc, theta);
   }
	
   gl.uniform1f(redColor,red);
   gl.uniform1f(greenColor,green);
   gl.uniform1f(blueColor,blue);
   gl.uniform1f(transparencyValue,transparency);
   gl.uniform1f(scaleLoc,scale/25);
   gl.uniform1f(translatexLoc,translateX);
   gl.uniform1f(translateyLoc,translateY);


   gl.drawArrays(gl.TRIANGLES, 0, 36);

   timeOut = setTimeout(function () {render();},speed);
}


function getRandomNumber()
{
   var rm = (Math.random()*(1.0 - 0.1) + 0.1).toFixed(2);
   console.log(rm);
   return rm;
}
 
function rotate(d) 
{
   theta += 0.1*d;
   gl.uniform1f(thetaLoc,theta);
}