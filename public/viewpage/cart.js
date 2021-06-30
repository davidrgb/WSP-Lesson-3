import * as Element from './element.js'
import * as Route from '../controller/route.js'

export function addEventListeners() {

    Element.menuCart.addEventListener('click', async () => {
        history.pushState(null, null, Route.routePathnames.CART);
        await cart_page();
    })

}

export async function cart_page() {
    Element.root.innerHTML = '<h1>Shopping Cart</h1>'
}