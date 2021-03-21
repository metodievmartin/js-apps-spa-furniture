import {html} from "../../node_modules/lit-html/lit-html.js";
import {register} from "../api/data.js";


const registerTemplate = (onSubmit, invalidEmail, invalidPass, invalidRepass, errorMsg) => html`
    <div class="row space-top">
    <div class="col-md-12">
        <h1>Register New User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            ${errorMsg ? html`<div class="form-group">
                <p class="errorMsg">${errorMsg}</p>
            </div>` : ''}
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class=${'form-control' + (invalidEmail ? ' is-invalid' : '')} id="email" type="text" name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class=${'form-control' + (invalidPass ? ' is-invalid' : '')} id="password" type="password" name="password">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="rePass">Repeat</label>
                <input class=${'form-control' + (invalidRepass ? ' is-invalid' : '')} id="rePass" type="password" name="rePass">
            </div>
            <input type="submit" class="btn btn-primary" value="Register" />
        </div>
    </div>
</form>`;



export function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const repass = formData.get('rePass').trim();

        if (email === '' || password === '' || repass === '') {
            return ctx.render(registerTemplate(
                onSubmit,
                email === '',
                password === '',
                repass === '',
                'All fields are required!'
            ));
        }

        if (password !== repass) {
            return ctx.render(registerTemplate(
                onSubmit,
                false,
                true,
                true,
                'Passwords don\'t match'
            ));
        }

        await register(email, password);

        ctx.setUserNav();
        ctx.page.redirect('/');
    }
}