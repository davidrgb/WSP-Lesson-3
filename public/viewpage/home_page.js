import * as Element from './element.js'
import * as Route from '../controller/route.js'
import * as FirebaseController from '../controller/firebase_controller.js'
import * as Constant from '../model/constant.js'
import * as Util from './util.js'

export function addEventListeners() {

    Element.menuHome.addEventListener('click', async () => {
        history.pushState(null, null, Route.routePathnames.HOME);
        await home_page();
    })

}

export async function home_page() {

    let html = '<h1>Enjoy Shopping</h1>'

    let products;
    try {
        products = await FirebaseController.getProductList();
    } catch (e) {
        if (Constant.DEV) console.log(e);
        Util.info('Cannot get product info', JSON.stringify(e));
    }

    for (let i = 0; i < products.length; i++) {
        html += buildProductView(products[i], i);
    }

    Element.root.innerHTML = html;
}

function buildProductView(product, index) {
    return `
    <div class="card" style="width: 18rem; display: inline-block;">
        <img src="${product.imageURL}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">
                ${Util.currency(product.price)} <br>
                ${product.summary}
            </p>
        </div>
    </div>
    `;
}