export function imageToDataUri(img: HTMLImageElement, width: number, height: number) {
    // create an off-screen canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // set its dimension to target size
    canvas.width = width;
    canvas.height = height;

    // draw source image into the off-screen canvas:
    ctx.drawImage(img, 0, 0, width, height);

    // encode image to data-uri with base64 version of compressed image
    return canvas.toDataURL();
}

// function resizedataURL(datas, wantedWidth, wantedHeight)
// {
//     // We create an image to receive the Data URI
//     var img = document.createElement('img');

//     // When the event "onload" is triggered we can resize the image.
//     img.onload = function()
//         {        
//             // We create a canvas and get its context.
//             var canvas = document.createElement('canvas');
//             var ctx = canvas.getContext('2d');

//             // We set the dimensions at the wanted size.
//             canvas.width = wantedWidth;
//             canvas.height = wantedHeight;

//             // We resize the image with the canvas method drawImage();
//             ctx.drawImage(this, 0, 0, wantedWidth, wantedHeight);

//             var dataURI = canvas.toDataURL();

//             /////////////////////////////////////////
//             // Use and treat your Data URI here !! //
//             /////////////////////////////////////////
//         };

//     // We put the Data URI in the image's src attribute
//     img.src = datas;
// }