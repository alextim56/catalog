import { createDayProductList } from '../database/db.js'
import createCardListElement from '../components/productList.js'

export default async function showDayProductCards(dbLink) {
    // найти элемент списка товаров дня
    const cardListEl = document.querySelector('.day-products__list');
    // удалить старый список товаров дня
    cardListEl.querySelectorAll('.day-products__item').forEach(element => {
        element.remove();
    });

    const productList = await createDayProductList(dbLink);
    createCardListElement(productList, cardListEl, 'day-products__item');

    cardListEl.querySelectorAll('.product-card').forEach(element => {
        element.classList.add('product-card--small');
    });

    cardListEl.querySelectorAll('.day-products__item').forEach(element => {
        element.classList.add('swiper-slide');
    });
}