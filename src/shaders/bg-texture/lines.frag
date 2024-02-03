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

    float lineWidth = (size / wz) / 2.; // draw width / size

    vec2 pixelsBefore = floor(worldCoord / pixelRatio);
    vec2 linePortions = clamp((lineWidth - (pixelsBefore * pixelRatio)) / pixelRatio, 0., 1.);

    gl_FragColor = vec4(color.x, color.y, color.z, 1. * linePortions.y);
}
