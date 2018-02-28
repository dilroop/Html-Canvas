var inc = -50;
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var img = document.getElementById("scream");
ctx.drawImage(img, 0, 0);
var imgData = ctx.getImageData(0, 0, c.width, c.height);
var i;
ctx.putImageData(imgData, 0, 0);
for (i = 0; i < imgData.data.length; i += 4) {
    imgData.data[i] =  process(imgData.data[i]);
    // imgData.data[i+1] = process(imgData.data[i+1]);
    // imgData.data[i+2] = process(imgData.data[i+2]);
    // imgData.data[i+3] = 255;
  }
ctx.putImageData(imgData, 0, 0);

function process(xx)
{
  return (xx + inc);
};
