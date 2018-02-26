export function imageToDataUri(img: HTMLImageElement, height: number, width: number, noScale?: boolean): string {
    // create an off-screen canvas
    const canvas = document.createElement('canvas');

    const ctx = canvas.getContext('2d');

    // set its dimension to target size
    // let scale: number;
    let useNaturalWidth: boolean = false;

    if (img.naturalHeight > height || noScale) {
        canvas.height = height;
        // scale = canvas.height / img.naturalHeight;
    } else {
        canvas.height = img.naturalHeight;
        useNaturalWidth = true;
    }

    // if (!!width && img.naturalWidth > width) {
    if (useNaturalWidth) {
        canvas.width = img.naturalWidth;
    } else if (noScale) {
        canvas.width = width;
    } else {
        const scale = canvas.height / img.naturalHeight;
        canvas.width = img.naturalWidth * scale;
    }

    // draw source image into the off-screen canvas:
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // encode image to data-uri with base64 version of compressed image
    console.log('ImageToDataUri completed!');

    return canvas.toDataURL();
}
