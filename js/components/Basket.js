import createBasketElement from './basketElement.js';

// корзина товаров
export default class Basket {
    _products = [];

    constructor(basketCount) {
        this._basketCount = basketCount;
        this._basketCount.textContent = this._products.length;
    }

    add(product) {
        if (!this._products.find(x => x.id == product.id)) {
            this._products.push(product);
            this._basketCount.textContent = this._products.length;
        }
    }

    remove(id) {
        this._products = this._products.filter(x => x.id != id);
        this._basketCount.textContent = this._products.length;
    }

    clear() {
        this._products = [];
        this._basketCount.textContent = this._products.length;
    }

    get length() {
        return this._products.length;
    }

    get products() {
        return this._products;
    }

    getElement() {
        return createBasketElement(this);
    }
}