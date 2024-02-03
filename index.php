<?php

function webgl_script_load(string $type, string $path, string $id, array $html_params = []): void {
    $param = "";

    foreach ($html_params as $key => $value) {
        $param .= " $key='$value'";
    }

    echo "<script type='webgl-$type' id='$id' $param>";
    readfile($path);
    echo "</script>";
}

?><!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>WebGL</title>

    <script src="out/main.js" defer></script>

    <link rel="stylesheet" href="out/style.css">

    <?php $bgt_class = ["class" => "bgt-frag"]; ?>
    <?php webgl_script_load("vert", __DIR__ . "/src/shaders/bg-texture/base.vert", "bgt-vert-base"); ?>
    <?php webgl_script_load("frag", __DIR__ . "/src/shaders/bg-texture/dots.frag", "bgt-frag-Dotted", $bgt_class); ?>
    <?php webgl_script_load("frag", __DIR__ . "/src/shaders/bg-texture/grid.frag", "bgt-frag-Grid", $bgt_class); ?>
    <?php webgl_script_load("frag", __DIR__ . "/src/shaders/bg-texture/lines.frag", "bgt-frag-Lines", $bgt_class); ?>
    <?php webgl_script_load("frag", __DIR__ . "/src/shaders/bg-texture/plain.frag", "bgt-frag-Plain", $bgt_class); ?>
</head>
<body></body>
</html>