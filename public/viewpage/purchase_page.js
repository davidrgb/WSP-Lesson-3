import * as Element from './element.js'
import * as Route from '../controller/route.js'
import * as FirebaseController from '../controller/firebase_controller.js'
import * as Auth from '../controller/auth.js'
import * as Constant from '../model/constant.js'
import * as Util from './util.js'

export function addEventListeners() {

    Element.menuPurchases.addEventListener('click', async () => {
        history.pushState(null, null, Route.routePathnames.PURCHASE);
        const label = Util.disableButton(Element.menuPurchases);
        await purchase_page();
        Util.enableButton(Element.menuPurchases, label);
    })

}

export async function purchase_page() {
    if (!Auth.currentUser) {
        Element.root.innerHTML = '<h1>Protected Page</h1>'
        return;
    }

    let html = `<h1>Purchase Page</h1>`

    let carts;
    try {
        carts = await FirebaseController.getPurchaseHistory(Auth.currentUser.uid);
        if (carts.length == 0) {
            html += '<h2>No purchase history found!</h2>'
            Element.root.innerHTML = html;
            return;
        }
    } catch (e) {
        if (Constant.DEV) console.log(e);
        Util.info('Error in getPurchaseHistory', JSON.stringify(e));
    }

    html += `
    <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">View</th>
                <th scope="col">Items</th>
                <th scope="col">Price</th>
                <th scope="col">Date</th>
            </tr>
        </thead>
    <tbody>
    `;

    for (let i = 0; i < carts.length; i++) {
        html += `
            <tr>
                <td>
                    <form class="form-purchase-history" method="post">
                        <input type="hidden" name="index" value="${i}">
                        <button type="submit" class="btn btn-outline-primary">Details</button>
                    </form>
                </td>
                <td>${carts[i].getTotalQty()}</td>
                <td>${Util.currency(carts[i].getTotalPrice())}</td>
                <td>${Date(carts[i].timestamp).toString()}</td>
            </tr>
        `
    }

    html += '</tbody></table>'

    Element.root.innerHTML = html;

    const historyForms = document.getElementsByClassName('form-purchase-history');
    for (let i = 0; i < historyForms.length; i++) {
        historyForms[i].addEventListener('submit', e => {
            e.preventDefault();
            const index = e.target.index.value;
            Element.modalTransactionTitle.innerHTML = `Purchased At: ${new Date(carts[index].timestamp).toString()}`;
            Element.modalTransactionBody.innerHTML = buildTransactionView(carts[index]);
            Element.modalTransactionView.show();
        })
    }
}

function buildTransactionView(cart) {
    let html = `
    <table class="table">
        <thead>
            <tr>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Sub-Total</th>
                <th scope="col" width="50%">Summary</th>
            </tr>
        </thead>
    <tbody>
    `

    cart.items.forEach(item => {
        html += `
        <tr>
            <td><img src="${item.imageURL}" width="150px"></td>
            <td>${item.name}</td>
            <td>${Util.currency(item.price)}</td>
            <td>${item.qty}</td>
            <td>${Util.currency(item.qty * item.price)}</td>
            <td>${item.summary}</td>
        </tr>
        `
    })
    html += '</tbody></table>';
    html += `<div style="font-size: 150%">Total: ${Util.currency(cart.getTotalPrice())}</div>`

    return html
}