// сделать корзину товаров из DOM-элементов
export default function createBasketElement(basket) {
    if (basket._products.length == 0) {
        const emptyBasketEl = document.createElement('div');
        emptyBasketEl.classList.add('basket__empty-block');
        emptyBasketEl.textContent = 'Корзина пока пуста';
        return emptyBasketEl;
    } else {
        const cardListEl = document.createElement('ul');
        cardListEl.classList.add('basket__list');
        basket._products.forEach(element => {
            const cardListItemEl = document.createElement('li');
            cardListItemEl.classList.add('basket__item');

            const cardListBlockEl = document.createElement('div');
            cardListBlockEl.classList.add('basket__img');

            const cardListImageEl = document.createElement('img');
            cardListImageEl.src = element.image;
            cardListImageEl.width = 60;
            cardListImageEl.height = 60;
            cardListImageEl.alt = 'Фотография товара';

            cardListBlockEl.append(cardListImageEl);

            const cardListItemNameEl = document.createElement('span');
            cardListItemNameEl.classList.add('basket__name');
            cardListItemNameEl.textContent = element.name;

            const cardListItemPriceEl = document.createElement('span');
            cardListItemPriceEl.classList.add('basket__price');
            cardListItemPriceEl.textContent = `${element.price.new} руб.`;

            const cardListItemButtonEl = document.createElement('button');
            cardListItemButtonEl.classList.add('basket__item-close');
            cardListItemButtonEl.setAttribute('type', 'button');

            const cardListItemButtonIconEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            cardListItemButtonIconEl.setAttribute('width', 24);
            cardListItemButtonIconEl.setAttribute('height', 24);
            cardListItemButtonIconEl.setAttribute('aria-hidden', true);
            cardListItemButtonIconEl.classList.add('main-menu__icon');

            const cardListItemButtonUseEl = document.createElementNS('http://www.w3.org/2000/svg', 'use');
            cardListItemButtonUseEl.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'images/sprite.svg#icon-close');
            cardListItemButtonIconEl.append(cardListItemButtonUseEl);
            cardListItemButtonEl.append(cardListItemButtonIconEl);
            cardListItemButtonEl.setAttribute('data-id', element.id);

            cardListItemEl.append(cardListBlockEl);
            cardListItemEl.append(cardListItemNameEl);
            cardListItemEl.append(cardListItemPriceEl);
            cardListItemEl.append(cardListItemButtonEl);
            cardListEl.append(cardListItemEl);
        });
        return cardListEl;
    }
}