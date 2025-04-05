import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `
        <li class="product-card">
            <a href="product_pages/?product=${product.Id}">
                <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
                <h3>${product.Brand.Name}</h3>
                <p>${product.NameWithoutBrand}</p>
                <p class="product-card_price">$${product.FinalPrice}</p>
            </a>
        </li>
        `;
}
export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
        document.querySelector(".title").textContent = this.category;
    }

    renderList(list) {
        //const htmlStrings = list.map(productCardTemplate);
        //this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}