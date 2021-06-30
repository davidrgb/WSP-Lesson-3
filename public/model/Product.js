export class Product {
    constructor(data) {
        this.name = data.name.toLowerCae();
        this.price = typeof data.price == 'number' ? data.price : Number(data.price);
        this.summary = data.summary;
        this.imageName = data.imageName;
        this.imageURL = data.imageURL;
        this.qty = Number.isInteger(data.qty) ? data.qty : null;
    }

    serialize() {
        return {
            name: this.name,
            price: this.price,
            summary: this.summary,
            imageName: this.imageName,
            imageURL: this.imageURL,
            qty: this.qty,
        };
    }
}