import {html} from "../../node_modules/lit-html/lit-html.js";
import {getMyFurniture} from "../api/data.js";
import {singleFurnitureItemTemplate} from "./common/items.js";

const myFurnitureTemplate = (data) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>My Furniture</h1>
            <p>This is a list of your publications.</p>
        </div>
    </div>
    <div class="row space-top">
        ${data.length > 0 ? 
                data.map(singleFurnitureItemTemplate) : 
                html`<p>You have no publications yet...</p>`}
    </div>`;


export async function myPage(ctx) {
    const data = await getMyFurniture()
    ctx.render(myFurnitureTemplate(data))
}