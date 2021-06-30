import * as Element from './element.js'
import * as Route from '../controller/route.js'

export function addEventListeners() {

    Element.menuProfile.addEventListener('click', async () => {
        history.pushState(null, null, Route.routePathnames.PROFILE);
        await profile_page();
    })

}

export async function profile_page() {
    Element.root.innerHTML = '<h1>Profile Page</h1>'
}