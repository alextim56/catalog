import Availability from './../types/Availability.js'
import Price from './../types/Price.js'
import createProductElement from './productElement.js';

// класс Товара
export default class Product {
    _id = 0;
    _name = '';
    _price = new Price();
    _image = '';
    _availability = new Availability();
    _type = [];
    _rating = 0;
    _goodsOfDay = false;

    constructor(id, name, price, image, availability, type, rating, goodsOfDay) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._image = image;
        this._availability = availability;
        this._type = type;
        this._rating = rating;
        this._goodsOfDay = goodsOfDay;
    }

    get id() {
        return this._id;
    }

    // сделать карточку товара из DOM-элементов
    getElement() {
        return createProductElement(this);
    }
}