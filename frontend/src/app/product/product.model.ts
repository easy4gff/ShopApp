// Продукт магазина
export class Product {
    // Идентификатор
    id: number;
    // Цена в долларах (или рублях, хоть в догги-койнах)
    price: number;
    // Название продукта
    title: string;
    // Изображение в кодировке base64
    image: string;
    // Дополнительная информация о продукте
    additionalInfo: Map<string, string>;
    // Описание
    description: string;

    // Конструктор
    constructor(id: number, price: number, title: string, image: string, info?: Map<string, string>, description?: string) {
        this.id = id;
        this.price = price;
        this.title = title;
        this.image = image;
        this.additionalInfo = info ? info : new Map<string, string>();
        this.description = description ? description : '';
    }
}
