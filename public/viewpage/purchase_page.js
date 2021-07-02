import * as Element from './element.js'
import * as Route from '../controller/route.js'
import * as FirebaseController from '../controller/firebase_controller.js'
import * as Auth from '../controller/auth.js'
import * as Constant from '../model/constant.js'
import * as Util from './util.js'

export function addEventListeners() {

    Element.menuPurchases.addEventListener('click', async () => {
        history.pushState(null, null, Route.routePathnames.PURCHASE);
        await purchase_page();
    })

}

export async function purchase_page() {
    let html = `<h1>Purchase Page</h1>`

    let carts;
    try {
        carts = await FirebaseController.getPurchaseHistory(Auth.currentUser.uid);
    } catch (e) {
        if (Constant.DEV) console.log(e);
        Util.info('Error in getPurchaseHistory', JSON.stringify(e));
    }

    Element.root.innerHTML = html;
}