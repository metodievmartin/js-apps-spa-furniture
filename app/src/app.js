import page from "../node_modules/page/page.mjs";
import {render} from "../node_modules/lit-html/lit-html.js";

import {dashboardPage} from "./views/dashboard.js";
import {detailsPage} from "./views/details.js";
import {createPage} from "./views/create.js";
import {editPage} from "./views/edit.js";
import {registerPage} from "./views/register.js";
import {loginPage} from "./views/login.js";
import {myPage} from "./views/myFurniture.js";
import {logout} from "./api/data.js";

const main = document.querySelector('div.container');

page('/',decorateContext, dashboardPage);
page('/dashboard',decorateContext, dashboardPage);
page('/my-furniture',decorateContext, myPage);
page('/details/:id',decorateContext, detailsPage);
page('/create',decorateContext, createPage);
page('/edit/:id',decorateContext, editPage);
page('/register',decorateContext, registerPage);
page('/login',decorateContext, loginPage);

document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logout();
    setUserNav();
    page.redirect('/');
});

setUserNav();

// Start application
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav() {
    const userId = sessionStorage.getItem('userId');
    if (userId !== null) {
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}