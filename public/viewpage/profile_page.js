import * as Element from './element.js'
import * as Route from '../controller/route.js'
import * as FirebaseController from '../controller/firebase_controller.js'
import * as Constant from '../model/constant.js'
import * as Util from './util.js'

export function addEventListeners() {

    Element.menuProfile.addEventListener('click', async () => {
        history.pushState(null, null, Route.routePathnames.PROFILE);
        await profile_page();
    })

}

let accountInfo;

export async function profile_page() {
    Element.root.innerHTML = '<h1>Profile Page</h1>'
}

export async function getAccountInfo(user) {
    try {
        accountInfo = await FirebaseController.getAccountInfo(user.uid);
    } catch (e) {
        if (Constant.DEV) console.log(e);
        Util.info(`Failed to retrieve account info for ${user.email}`, JSON.stringify(e));
        accountInfo = null;
        return;
    }
    Element.menuProfile.innerHTML = `
        <img src=${accountInfo.photoURL} class="rounded-circle" height="30px">
    `;
}