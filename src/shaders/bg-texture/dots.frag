#version 100

precision mediump float;
uniform vec2 res;
uniform vec2 pos;
uniform float zoom;
uniform float scale;
uniform vec3 color;
uniform float size;

void main() {
    float wz = scale * zoom;
    float pixelRatio = 1./wz;
    vec2 ucoord = (gl_FragCoord.xy + 0.5) - res / 2.;
    vec2 worldCoord = fract(ucoord.xy * pixelRatio + pos);

    if (worldCoord.x > 0.5) {
        worldCoord.x = abs(worldCoord.x - 1.);
    }

    if (worldCoord.y > 0.5) {
        worldCoord.y = abs(worldCoord.y - 1.);
    }

    float radius = size / wz; // draw width / size

    if (sqrt(pow(worldCoord.x, 2.) + pow(worldCoord.y, 2.)) <= radius) {
        gl_FragColor = vec4(color.r, color.g, color.b, 1.);
    } else {
        discard;
    }
}
