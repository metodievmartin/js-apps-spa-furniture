import {html} from "../../node_modules/lit-html/lit-html.js";
import {createFurniture} from "../api/data.js";

const createTemplate = (onSubmit) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Create New Furniture</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit=${onSubmit}>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-make">Make</label>
                    <input class="form-control valid" id="new-make" type="text" name="make">
                </div>
                <div class="form-group has-success">
                    <label class="form-control-label" for="new-model">Model</label>
                    <input class="form-control" id="new-model" type="text" name="model">
                </div>
                <div class="form-group has-danger">
                    <label class="form-control-label" for="new-year">Year</label>
                    <input class="form-control" id="new-year" type="number" name="year">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-description">Description</label>
                    <input class="form-control" id="new-description" type="text" name="description">
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-price">Price</label>
                    <input class="form-control" id="new-price" type="number" name="price">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-image">Image</label>
                    <input class="form-control" id="new-image" type="text" name="img">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-material">Material (optional)</label>
                    <input class="form-control" id="new-material" type="text" name="material">
                </div>
                <input type="submit" class="btn btn-primary" value="Create" />
            </div>
        </div>
    </form>`;

export async function createPage(ctx) {

    ctx.render(createTemplate(onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);

        //getting all 7 input field entries from formData and reducing them to one object with structure {input name: input value}
        const data = [...formData.entries()]
            .reduce((a, [k, v]) => Object.assign(a, {[k]: v}),{});

        //checking if there are any empty fields, excluding 'material' for it's optional
        if (Object.entries(data).filter(([k, v]) => k !== 'material').some(([k, v]) => v === '')) {
            return alert('Please fill all required fields!');
        }

        //thorough validation to be implemented

        data.year = Number(data.year);
        data.price = Number(data.price);
        await createFurniture(data);

        ctx.page.redirect('/');
    }
}