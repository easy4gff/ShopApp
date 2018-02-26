export function imageToDataUri(img: HTMLImageElement, width: number, height: number): string {
    // create an off-screen canvas
    const canvas = document.createElement('canvas');

    const ctx = canvas.getContext('2d');

    // set its dimension to target size
    canvas.width = width;
    canvas.height = height;

    // draw source image into the off-screen canvas:
    ctx.drawImage(img, 0, 0, width, height);

    // encode image to data-uri with base64 version of compressed image
    console.log('ImageToDataUri completed!');

    return canvas.toDataURL();
}
