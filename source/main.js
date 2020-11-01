/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



const canvas = document.getElementById('mainCanvas');
const gl = canvas.getContext('webgl');
if (!gl) throw new Error('no webGL!');


gl.clearColor(0.0, 1.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

// rectangle in array 2 triangles
let vertices = [
  0.5, 0.5, 
  0.5, -0.5,
  -0.5, 0.5, 
  0.5, -0.5,
  -0.5, 0.5,
  -0.5, -0.5,
];

let shapeColor= [
  0, 1, 0,
  0, 1, 0,
  0, 1, 0,
  0, 1, 0,
  0, 1, 0,
  0, 1, 0
];

function putCircle(x, y, d) {
  const pi = Math.PI;
  let prevX = x+d;
  let prevY = y;

  for( let i=0; i<360; i++ ) {
    let r = i* (pi/180);
    vertices.push( prevX, prevY );
    vertices.push( x, y );
    prevX = x+(Math.cos(r)*d);
    prevY = y+(Math.sin(r)*d);
    vertices.push( prevX, prevY );

    console.log( prevX, prevY );
    
    shapeColor.push(1, 0, 0, 1, 0, 0, 1, 0, 0,);
  }
}

putCircle(0.5, 0.5, 0.5);
putCircle(-0.5, 0.5, 0.5);
putCircle(0.5, -0.5, 0.5);
putCircle(-0.5, -0.5, 0.5);

putCircle(0.5, 0.5, 0.1);
putCircle(-0.5, 0.5, 0.1);
putCircle(0.5, -0.5, 0.1);
putCircle(-0.5, -0.5, 0.1);

putCircle(0.5, 0, 0.1);
putCircle(0, 0.5, 0.1);
putCircle(-0.5, -0, 0.1);
putCircle(0, -0.5, 0.1);


// Creating Buffres
const positions = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positions);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

const colors = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colors);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shapeColor), gl.STATIC_DRAW);




const program = gl.createProgram();

// creating & compiling shaders
const vs = `
precision mediump float;

attribute vec2 position;
attribute vec3 color;
varying vec3 outColor;

void main() { 
  outColor = color;
  gl_Position = vec4(position, 0, 1);
}
`;
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vs);
gl.compileShader(vertexShader);


const fs = `
precision mediump float;
varying vec3 outColor;

void main(){
    gl_FragColor = vec4(outColor, 1);
}
`
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fs);
gl.compileShader(fragmentShader);


// linking program
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);



// binding buffers to parameters
const positionLocation = gl.getAttribLocation(program, `position`);
gl.enableVertexAttribArray(positionLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, positions);
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

const colorLocation = gl.getAttribLocation(program, `color`);
gl.enableVertexAttribArray(colorLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, colors);
gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

// initiate
gl.useProgram(program);
gl.drawArrays(gl.TRIANGLES, 0, 366);