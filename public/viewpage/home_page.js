import * as Element from './element.js'
import * as Route from '../controller/route.js'

export function addEventListeners() {

    Element.menuHome.addEventListener('click', async () => {
        history.pushState(null, null, Route.routePathnames.HOME);
        await home_page();
    })

}

export async function home_page() {
    Element.root.innerHTML = '<h1>Home Page</h1>'
}