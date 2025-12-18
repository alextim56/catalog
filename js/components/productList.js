import Product from './Product.js'
import Availability from '../types/Availability.js'
import Price from '../types/Price.js'

// создание списка товаров
export default function createCardListElement(productList, listContainer, itemClassName) {
    productList.forEach(element => {
        const availability = new Availability(element.availability.moscow, element.availability.orenburg, element.availability.saintPetersburg);
        const product = new Product(element.id, element.name, new Price(element.price.new, element.price.old), element.image, availability, element.type, element.rating, element.goodsOfDay);

        const newCardElement = product.getElement();

        // настроить функцию добавления в корзину
        /*const addBasketBtn = newCardElement.firstElementChild.lastElementChild.firstElementChild;
        if (addBasketBtn.classList.contains('btn--icon')) {
            addBasketBtn.addEventListener('click', function (e) {
                basket.add(product);
                //showBasketContent();
                e.preventDefault();
            });
        }*/
        const cardListItemEl = document.createElement('li');
        cardListItemEl.classList.add(itemClassName);
        cardListItemEl.append(newCardElement);
        listContainer.append(cardListItemEl);
    });
}