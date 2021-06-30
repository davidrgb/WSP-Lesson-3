export class ShoppingCart {

    constructor(uid) {
        this.uid = uid;
        this.items = [];
    }

    addItem(product) {
        const item = this.items.find(e => product.docId == e.docId);
        if (!item) {
            product.qty = 1;
            const newItem = product.serialize();
            newItem.docId = product.docId;
            this.items.push(newItem);
        } else {
            ++product.qty;
            ++item.qty;
        }
    }

    removeItem(product) {
        const index = this.items.findIndex(e => product.docId == e.docId);
        if (index < 0) return;

        --this.items[index].qty;
        --product.qty;
        if (product.qty == 0) {
            this.items.splice(index, 1);
        }
    }

    getTotalQty() {
        let n = 0;
        this.items.forEach(e => {n += e.qty})
        return n;
    }
}