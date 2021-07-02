import * as Constant from '../model/constant.js'
import { Product } from '../model/Product.js';

export async function signIn(email, password) {
    await firebase.auth().signInWithEmailAndPassword(email, password);
}

export async function signOut() {
    await firebase.auth().signOut();
}

export async function getProductList() {
    const products = [];
    const snapShot = await firebase.firestore().collection(Constant.collectionNames.PRODUCTS)
            .orderBy('name')
            .get();
    snapShot.forEach(doc => {
        const p = new Product(doc.data())
        p.docId = doc.id;
        products.push(p);
    })
    return products;
}

export async function checkOut(cart) {
    const data = cart.serialize(Date.now());
    await firebase.firestore().collection(Constant.collectionNames.PURCHASE_HISTORY)
                .add(data);
}