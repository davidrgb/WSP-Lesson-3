import * as Element from './element.js'
import * as Route from '../controller/route.js'
import * as FirebaseController from '../controller/firebase_controller.js'
import * as Constant from '../model/constant.js'
import * as Util from './util.js'
import * as Auth from '../controller/auth.js'

export function addEventListeners() {

    Element.menuProfile.addEventListener('click', async () => {
        history.pushState(null, null, Route.routePathnames.PROFILE);
        await profile_page();
    })

}

let accountInfo;

export async function profile_page() {
    let html = '<h1>Profile Page</h1>'

    if (!Auth.currentUser) {
        html += '<h2>Protected Page</h2>'
        Element.root.innerHTML = html;
        return;
    }

    if (!accountInfo) {
        html += `<h2>Failed to retrieve account info for ${Auth.currentUser.email} </h2>`
        Element.root.innerHTML = html;
        return;
    }

    html += `
    <div class="alert alert-primary">
        Email: ${Auth.currentUser.email} (cannot change email as login name)
    </div>
    `;

    html += `
    <form class="form-profile" method="post">
        <table class="table table-sm">
        <tr>
            <td width="15%">Name:</td>
            <td width="60%">
                <input type="text" name="name" value="${accountInfo.name}"
                    placeholder="firstname lastname" disabled required
                    pattern="^[A-Za-z][A-Za-z|'|-| ]+">
            </td>
            <td>${actionButtons()}</td>
        </tr>
        </table>
    </form>
    `;

    html += `
    <form class="form-profile" method="post">
        <table class="table table-sm">
        <tr>
            <td width="15%">Address:</td>
            <td width="60%">
                <input type="text" name="address" value="${accountInfo.address}"
                    placeholder="Address" disabled required
                    minlength="2">
            </td>
            <td>${actionButtons()}</td>
        </tr>
        </table>
    </form>
    `;

    html += `
    <form class="form-profile" method="post">
        <table class="table table-sm">
        <tr>
            <td width="15%">City:</td>
            <td width="60%">
                <input type="text" name="city" value="${accountInfo.city}"
                    placeholder="City" disabled required
                    minlength="2">
            </td>
            <td>${actionButtons()}</td>
        </tr>
        </table>
    </form>
    `;

    html += `
    <form class="form-profile" method="post">
        <table class="table table-sm">
        <tr>
            <td width="15%">State:</td>
            <td width="60%">
                <input type="text" name="state" value="${accountInfo.state}"
                    placeholder="State (uppercase 2 letter state code)" disabled required
                    pattern="[A-Z]+"
                    minlength="2" maxlength="2">
            </td>
            <td>${actionButtons()}</td>
        </tr>
        </table>
    </form>
    `;

    html += `
    <form class="form-profile" method="post">
        <table class="table table-sm">
        <tr>
            <td width="15%">Zip:</td>
            <td width="60%">
                <input type="text" name="zip" value="${accountInfo.zip}"
                    placeholder="5 digit zip code" disabled required
                    pattern="[0-9]+"
                    minlength="5" maxlength="5">
            </td>
            <td>${actionButtons()}</td>
        </tr>
        </table>
    </form>
    `;

    html += `
    <form class="form-profile" method="post">
        <table class="table table-sm">
        <tr>
            <td width="15%">Credit Card #:</td>
            <td width="60%">
                <input type="text" name="creditNo" value="${accountInfo.creditNo}"
                    placeholder="credit card number 16 digits" disabled required
                    pattern="[0-9]+"
                    minlength="16" maxlength="16">
            </td>
            <td>${actionButtons()}</td>
        </tr>
        </table>
    </form>
    `;

    html += `
    <table>
        <tr>
            <td>
                <input type="file" id="profile-photo-upload-button" value="upload">
            </td>
            <td>
                <img id="profile-img-tag" src="${accountInfo.photoURL}" class="rounded-circle" width="250px">
            </td>
            <td>
                <button id="profile-photo-update-button" class="btn btn-outline-danger">Update Photo</button>
            </td>
        </tr>
    </table>
    `

    Element.root.innerHTML = html;

    const forms = document.getElementsByClassName('form-profile');
    for (let i = 0; i < forms.length; i++) {
        forms[i].addEventListener('submit', e => {
            e.preventDefault();
            const buttons = e.target.getElementsByTagName('button');
            const inputTag = e.target.getElementsByTagName('input')[0];
            const buttonLabel = e.target.submitter;
            if (buttonLabel == 'Edit') {
                buttons[0].style.display = 'none';
                buttons[1].style.display = 'inline-block';
                buttons[2].style.display = 'inline-block';
                inputTag.disabled = false;
            } else if (buttonLabel == 'Update') {
                buttons[0].style.display = 'inline-block';
                buttons[1].style.display = 'none';
                buttons[2].style.display = 'none';
                inputTag.disabled = true;

            } else {
                buttons[0].style.display = 'inline-block';
                buttons[1].style.display = 'none';
                buttons[2].style.display = 'none';
                inputTag.disabled = true;
            }
        })
    }
}

function actionButtons() {
    return `
        <button onclick="this.form.submitter='Edit'"
            type="submit" class="btn btn-outline-primary">Edit</button>
        <button onclick="this.form.submitter='Update'"
            type="submit" class="btn btn-outline-danger" style="display: none;">Update</button>
        <button onclick="this.form.submitter='Cancel'" formnovalidate="true"
            type="submit" class="btn btn-outline-secondary" style="display: none;">Cancel</button>
    `;
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