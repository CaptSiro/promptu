#version 100

precision mediump float;
uniform float size;

void main() {
    if (mod(gl_FragCoord.x, size) < 2. && mod(gl_FragCoord.y, size) < 2.) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.5);
    } else {
        discard;
    }
}
