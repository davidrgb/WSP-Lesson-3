import * as FirebaseController from './firebase_controller.js'
import * as Element from '../viewpage/element.js'
import * as Util from '../viewpage/util.js'
import * as Constant from '../model/constant.js'

export function addEventListeners() {

    Element.formSignIn.addEventListener('submit', async e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        try {
            await FirebaseController.signIn(email, password);
            Element.modalSignIn.hide();
        } catch (e) {
            if (Constant.DEV) console.log(e);
            Util.info('Sign In Error', JSON.stringify(e), Element.modalSignIn);
        }
    })

}