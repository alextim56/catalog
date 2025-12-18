// стоимость товара старая и новая
export default class Price {
    _new = 0;
    _old = 0;

    constructor (newPrice, oldPrice) {
        if (newPrice) {
            this._new = newPrice;
        }
        if (oldPrice) {
            this._old = oldPrice;
        }
    }

    get new() {
        return this._new;
    }

    get old() {
        return this._old;
    }
}