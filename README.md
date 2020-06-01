# autoscroll

## setup

you'll need node.js

run
```
npm install
```

## save images

run
```
npm run scroll [url] [width] [height] [stepsize] [deviceScaleFactor] [directory]
```

all parameters but must be in that order. They default to `https://github.com`, `512`, `512`, `25`, `1`, `./output/`. `stepsize` defines how far a page is scrolled between taking screenshots.

## convert to video

you'll need [ffmpeg](https://ffmpeg.org).

run
```
cat output/*.png | ffmpeg -an -f image2pipe -i - -framerate 60 -vcodec libx264 -pix_fmt yuv420p -profile:v baseline -level 3 output.mp4
```

## delete images

run
```
rm output/*.png
```