// сделать карточку товара из DOM-элементов
export default function createProductElement(product) {
    const cardEl = document.createElement('div');
    cardEl.classList.add('product-card');

    const visualCardEl = document.createElement('div');
    visualCardEl.classList.add('product-card__visual');

    const imageCardEl = document.createElement('img');
    imageCardEl.classList.add('product-card__img');
    imageCardEl.src = product._image;

    const moreCardEl = document.createElement('div');
    moreCardEl.classList.add('product-card__more');

    const linkBtnIconEl = document.createElement('a');
    linkBtnIconEl.classList.add('product-card__link');
    linkBtnIconEl.classList.add('btn');
    linkBtnIconEl.classList.add('btn--icon');
    linkBtnIconEl.href = '#';
    linkBtnIconEl.setAttribute('data-id', product.id);

    const linkBtnIconTextEl = document.createElement('span');
    linkBtnIconTextEl.classList.add('btn__text');
    linkBtnIconTextEl.textContent = 'В корзину';

    const linkBtnIconImageEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    linkBtnIconImageEl.setAttribute('width', 24);
    linkBtnIconImageEl.setAttribute('height', 24);
    linkBtnIconImageEl.setAttribute('aria-hidden', true);

    const linkBtnIconImageUseEl = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    linkBtnIconImageUseEl.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'images/sprite.svg#icon-basket');
    linkBtnIconImageEl.append(linkBtnIconImageUseEl);

    linkBtnIconEl.append(linkBtnIconTextEl, linkBtnIconImageEl);

    const linkBtnSecondEl = document.createElement('a');
    linkBtnSecondEl.classList.add('product-card__link');
    linkBtnSecondEl.classList.add('btn');
    linkBtnSecondEl.classList.add('btn--secondary');
    linkBtnSecondEl.href = '#';

    const linkBtnSecondTextEl = document.createElement('span');
    linkBtnSecondTextEl.classList.add('btn__text');
    linkBtnSecondTextEl.textContent = 'Подробнее';

    linkBtnSecondEl.append(linkBtnSecondTextEl);

    moreCardEl.append(linkBtnIconEl, linkBtnSecondEl);

    visualCardEl.append(imageCardEl);
    visualCardEl.append(moreCardEl);

    const infoCardEl = document.createElement('div');
    infoCardEl.classList.add('product-card__info');

    const infoCardTitleEl = document.createElement('h2');
    infoCardTitleEl.classList.add('product-card__title');
    infoCardTitleEl.textContent = product._name;

    const infoCardOldPriceEl = document.createElement('span');
    infoCardOldPriceEl.classList.add('product-card__old');

    const infoCardOldPriceNumberEl = document.createElement('span');
    infoCardOldPriceNumberEl.classList.add('product-card__old-number');
    infoCardOldPriceNumberEl.textContent = product._price.old;

    const infoCardOldPriceAddEl = document.createElement('span');
    infoCardOldPriceAddEl.classList.add('product-card__old-add');
    infoCardOldPriceAddEl.textContent = '₽';

    infoCardOldPriceEl.append(infoCardOldPriceNumberEl, infoCardOldPriceAddEl);

    const infoCardPriceEl = document.createElement('span');
    infoCardPriceEl.classList.add('product-card__price');

    const infoCardPriceNumberEl = document.createElement('span');
    infoCardPriceNumberEl.classList.add('product-card__price-number');
    infoCardPriceNumberEl.textContent = product._price.new;

    const infoCardPriceAddEl = document.createElement('span');
    infoCardPriceAddEl.classList.add('product-card__price-add');
    infoCardPriceAddEl.textContent = '₽';

    infoCardPriceEl.append(infoCardPriceNumberEl, infoCardPriceAddEl);

    const tooltipCardEl = document.createElement('div');
    tooltipCardEl.classList.add('product-card__tooltip');
    tooltipCardEl.classList.add('tooltip');

    const tooltipBtnEl = document.createElement('button');
    tooltipBtnEl.classList.add('tooltip__btn');
    tooltipBtnEl.id = `tooltip__btn${product.id}`;

    const tooltipBtnIconImageEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    tooltipBtnIconImageEl.setAttribute('width', 5);
    tooltipBtnIconImageEl.setAttribute('height', 10);
    tooltipBtnIconImageEl.setAttribute('aria-hidden', true);
    tooltipBtnIconImageEl.classList.add('tooltip__icon');

    const tooltipBtnIconImageUseEl = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    tooltipBtnIconImageUseEl.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'images/sprite.svg#icon-i');
    tooltipBtnIconImageEl.append(tooltipBtnIconImageUseEl);
    tooltipBtnEl.append(tooltipBtnIconImageEl);

    const tooltipContentEl = document.createElement('div');
    tooltipContentEl.classList.add('tooltip__content');
    tooltipContentEl.id = `tooltip__content${product.id}`;

    const tooltipTextEl = document.createElement('span');
    tooltipTextEl.classList.add('tooltip__text');
    tooltipTextEl.textContent = 'Наличие товара по городам:';

    const tooltipListEl = document.createElement('ul');
    tooltipListEl.classList.add('tooltip__list');

    const tooltipListMoscowItemEl = document.createElement('li');
    tooltipListMoscowItemEl.classList.add('tooltip__item');

    const tooltipTextMoscowEl = document.createElement('span');
    tooltipTextMoscowEl.classList.add('tooltip__text');
    tooltipTextMoscowEl.textContent = 'Москва: ';

    const tooltipCountMoscowEl = document.createElement('span');
    tooltipCountMoscowEl.classList.add('tooltip__count');
    tooltipCountMoscowEl.textContent = product._availability.moscow;

    tooltipTextMoscowEl.append(tooltipCountMoscowEl);
    tooltipListMoscowItemEl.append(tooltipTextMoscowEl);
    tooltipListEl.append(tooltipListMoscowItemEl);

    const tooltipListOrenburgItemEl = document.createElement('li');
    tooltipListOrenburgItemEl.classList.add('tooltip__item');

    const tooltipTextOrenburgEl = document.createElement('span');
    tooltipTextOrenburgEl.classList.add('tooltip__text');
    tooltipTextOrenburgEl.textContent = 'Оренбург: ';

    const tooltipCountOrenburgEl = document.createElement('span');
    tooltipCountOrenburgEl.classList.add('tooltip__count');
    tooltipCountOrenburgEl.textContent = product._availability.orenburg;

    tooltipTextOrenburgEl.append(tooltipCountOrenburgEl);
    tooltipListOrenburgItemEl.append(tooltipTextOrenburgEl);
    tooltipListEl.append(tooltipListOrenburgItemEl);

    const tooltipListSaintPetersburgItemEl = document.createElement('li');
    tooltipListSaintPetersburgItemEl.classList.add('tooltip__item');

    const tooltipTextSaintPetersburgEl = document.createElement('span');
    tooltipTextSaintPetersburgEl.classList.add('tooltip__text');
    tooltipTextSaintPetersburgEl.textContent = 'Санкт-Петербург: ';

    const tooltipCountSaintPetersburgEl = document.createElement('span');
    tooltipCountSaintPetersburgEl.classList.add('tooltip__count');
    tooltipCountSaintPetersburgEl.textContent = product._availability.saintPetersburg;

    tooltipTextSaintPetersburgEl.append(tooltipCountSaintPetersburgEl);
    tooltipListSaintPetersburgItemEl.append(tooltipTextSaintPetersburgEl);
    tooltipListEl.append(tooltipListSaintPetersburgItemEl);

    tooltipContentEl.append(tooltipTextEl, tooltipListEl);
    tooltipCardEl.append(tooltipBtnEl, tooltipContentEl);
    infoCardEl.append(infoCardTitleEl, infoCardOldPriceEl, infoCardPriceEl, tooltipCardEl);

    // подсказки по количеству товара средствами Tippy.JS
    tippy(tooltipBtnEl, {
        content: tooltipContentEl.innerHTML,
        allowHTML: true,
        arrow: true,
        theme: 'light',
        delay: [100, 300],
        placement: 'top-end',
    });

    cardEl.append(visualCardEl, infoCardEl);
    return cardEl;
}