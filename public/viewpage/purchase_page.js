import * as Element from './element.js'
import * as Route from '../controller/route.js'

export function addEventListeners() {

    Element.menuPurchases.addEventListener('click', async () => {
        history.pushState(null, null, Route.routePathnames.PURCHASE);
        await purchase_page();
    })

}

export async function purchase_page() {
    Element.root.innerHTML = '<h1>Purchase Page</h1>'
}