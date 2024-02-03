bun build src/main.js --outdir ./out
find ./src/components/ -name "*.css" -exec cat {} + > ./out/style.css
