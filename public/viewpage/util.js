import * as Element from './element.js'

export function info(title, body, closeModal) {
    if (closeModal) closeModal.hide();
    Element.modalInfoTitle.innerHTML = title;
    Element.modalInfoBody.innerHTML = body;
    Element.modalInfo.show();
}

export function currency(money) {
    return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(money);
}