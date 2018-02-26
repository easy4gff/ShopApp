import { Product } from '../models/product/product.model';

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

export function loadResizedImageAndIconForLightbox(
        image: any[],
        productTitle: string,
        productImage: string,
        fullHeight: number,
        fullWidth: number,
        iconHeight: number,
        iconWidth: number
    ): void {
    const img: HTMLImageElement = new Image();
    img.src = `data:image/jpg;base64,${ productImage }`;

    img.onload = () => {
    //   const sourceImage: string = imageToDataUri(img, IMAGE_FULL_HEIGHT, IMAGE_FULL_WIDTH);
    //   const thumbnail: string = imageToDataUri(img, IMAGE_ICON_HEIGHT, IMAGE_ICON_WIDTH, true);
        const sourceImage: string = imageToDataUri(img, fullHeight, fullWidth);
        const thumbnail: string = imageToDataUri(img, iconHeight, iconWidth, true);

        image.push({
            source: sourceImage,
            thumbnail: thumbnail,
            title: productTitle,
            style: 'width: 300px'
        });
    };
}
