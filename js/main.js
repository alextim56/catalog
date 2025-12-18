import Basket from './components/Basket.js'
import createCardListElement from './components/productList.js'
import showDayProductCards from './components/slider.js'
import { getAll, sortProducts, checkIncludes } from './database/db.js';

// количество карточек на странице
const productPageCount = 6;

const basket = new Basket(document.querySelector('.header__user-count'));

const mainMenuEl = document.querySelector('.main-menu');

const locationCityBtnEl = document.querySelector('.location__city');
const locationCityNameEl = document.querySelector('.location__city-name');
const sortListSelectEl = document.querySelector('.catalog__sort-select');
const filterItemsEl = document.querySelectorAll('.catalog-form__item-col');
const filterAvailableEl = document.querySelector('#instock');
const filterAllEl = document.querySelector('#all-item');

const pendantEl = document.querySelector('#pendant');
const ceilingEl = document.querySelector('#ceiling');
const overheadEl = document.querySelector('#overhead');
const pointEl = document.querySelector('#point');
const nightlightsEl = document.querySelector('#nightlights');

// открытие бургерного меню Каталог
document.querySelector('.header__catalog-btn').addEventListener('click', (e) => {
    mainMenuEl.classList.add('main-menu--active');
    e.stopPropagation();
});

document.querySelector('.main-menu__close').addEventListener('click', () => {
    mainMenuEl.classList.remove('main-menu--active');
});

locationCityBtnEl.addEventListener('click', (e) => {
    locationCityBtnEl.classList.toggle('location__city--active');
    e.stopPropagation();
});

// нажатие на кнопку Корзины
document.querySelector('.header__user-btn').addEventListener('click', (e) => {
    const basketContentEl = document.querySelector('.header__basket');
    basketContentEl.classList.toggle('basket--active');
    showBasketContent();
    e.stopPropagation();
}, true);

const dataLink = './data/data.json';

document.addEventListener('click', (e) => {
    if (mainMenuEl.classList.contains('main-menu--active')) {
        mainMenuEl.classList.remove('main-menu--active');
    }

    if (locationCityBtnEl.classList.contains('location__city--active')) {
        locationCityBtnEl.classList.remove('location__city--active');
    }

    if (!e.target.closest('.header__basket') && document.querySelector('.header__basket').classList.contains('basket--active')) {
        document.querySelector('.header__basket').classList.remove('basket--active');
    }
});

// сформировать массив карточек товаров с типом typeArray, 
// сортировкой orderNumber (0 - сначала дешевые, 1 - сначала дорогие, 2 - сначала популярные),
// наличие в городах availableCity (0 - без проверки, 1 - наличие в Москве, 2 - наличие в Оренбурге, 3 - наличие в Санкт-Петербурге)
const createProductList = async (typeArray, orderNumber, availableCity = 0) => {
    const products = await getAll(dataLink);
    let filteredData = products.filter(item => checkIncludes(typeArray, item.type));
    if (availableCity > 0) {
        switch (availableCity) {
            case 1:
                filteredData = filteredData.filter(item => item.availability.moscow > 0);
                break;
            case 2:
                filteredData = filteredData.filter(item => item.availability.orenburg > 0);
                break;
            case 3:
                filteredData = filteredData.filter(item => item.availability.saintPetersburg > 0);
                break;
        }
    }
    return filteredData.sort((a, b) => { return sortProducts(orderNumber, a, b) });
}

// реакция на добавление товара в корзину
const addToBasketEvent = async (cardListEl) => {
    const products = await getAll(dataLink);
    cardListEl.querySelectorAll('.btn--icon').forEach(element => {
        element.addEventListener('click', (e) => {
            basket.add(products.find(x => x.id == element.dataset.id));
            showBasketContent();
            e.preventDefault();
        });
    });
}

// отрисовка карточек товаров на странице pageNumber
const showProductCards = (productList, pageNumber) => {
    // добавление новых карточек товаров
    const cardListEl = document.querySelector('.catalog__list');
    // удалить старый список товаров
    cardListEl.querySelectorAll('.catalog__item').forEach(element => {
        element.remove();
    });
    const itemsArray = productList.slice(pageNumber * productPageCount, (pageNumber + 1) * productPageCount);
    createCardListElement(itemsArray, cardListEl, 'catalog__item');

    addToBasketEvent(cardListEl);
}

// пагинация с добавлением номеров страниц каталога товаров
const showPageNumbers = (productList) => {
    const pagesListEl = document.querySelector('.catalog__pagination');

    // удалить старый список страниц
    document.querySelectorAll('.catalog__pagination-item').forEach(element => {
        element.remove();
    });

    // генерация номеров страниц
    for (let index = 0; index < Math.ceil(productList.length / productPageCount); index++) {
        const pageItemEl = document.createElement('li');
        pageItemEl.classList.add('catalog__pagination-item');
        const pageButtonEl = document.createElement('button');
        pageButtonEl.classList.add('catalog__pagination-link');
        if (index == 0) {
            pageButtonEl.disabled = true;
        }
        pageButtonEl.textContent = index + 1;

        pageButtonEl.addEventListener('click', async function () {
            const products = await createProductList(getFilterArray(), sortListSelectEl.selectedIndex, getAvailableFilter());
            showProductCards(products, index);
            document.querySelectorAll('.catalog__pagination-link').forEach(element => {
                if (element.textContent == this.textContent) {
                    element.disabled = true;
                } else {
                    element.disabled = false;
                }
            });
        });

        pageItemEl.append(pageButtonEl);
        pagesListEl.append(pageItemEl);
    }
}

// показать количество товаров по каждой категории
const showCategoriesCount = async () => {
    const productsArray = await createProductList([], sortListSelectEl.selectedIndex, getAvailableFilter());
    pendantEl.nextElementSibling.lastElementChild.textContent = productsArray.filter(item => item.type.includes('pendant')).length;
    ceilingEl.nextElementSibling.lastElementChild.textContent = productsArray.filter(item => item.type.includes('ceiling')).length;
    overheadEl.nextElementSibling.lastElementChild.textContent = productsArray.filter(item => item.type.includes('overhead')).length;
    pointEl.nextElementSibling.lastElementChild.textContent = productsArray.filter(item => item.type.includes('point')).length;
    nightlightsEl.nextElementSibling.lastElementChild.textContent = productsArray.filter(item => item.type.includes('nightlights')).length;
}

// получить массив фильтров типов товаров
const getFilterArray = () => {
    let filterValues = [];
    filterItemsEl.forEach(element => {
        if (element.firstElementChild.firstElementChild.checked) {
            filterValues.push(element.firstElementChild.firstElementChild.value);
        }
    });
    return filterValues;
}

// наличие товара в городах (0 - без проверки, 1 - наличие в Москве, 2 - наличие в Оренбурге, 3 - наличие в Санкт-Петербурге)
const getAvailableFilter = () => {
    let selectedFilter = 0;

    if (filterAvailableEl.checked && locationCityNameEl.textContent === 'Москва') {
        selectedFilter = 1;
    }
    if (filterAvailableEl.checked && locationCityNameEl.textContent === 'Оренбург') {
        selectedFilter = 2;
    }
    if (filterAvailableEl.checked && locationCityNameEl.textContent === 'Санкт-Петербург') {
        selectedFilter = 3;
    }

    return selectedFilter;
}

// обновить данные о товарах
const updateProductsInfo = async () => {
    const productsArray = await createProductList(getFilterArray(), sortListSelectEl.selectedIndex, getAvailableFilter());
    showProductCards(productsArray, 0); // отрисовка карточек товаров
    showPageNumbers(productsArray); // Отображение количества товаров в соответствующей категории рядом с каждым фильтром
    showCategoriesCount(); // показать количество товаров по каждой категории
}

const showBasketContent = () => {
    const basketContentEl = document.querySelector('.header__basket');
    basketContentEl.innerHTML = '';
    basketContentEl.append(basket.getElement());

    if (basketContentEl.querySelector('.basket__list')) {
        const basketLinkEl = document.createElement('a');
        basketLinkEl.classList.add('basket__link');
        basketLinkEl.classList.add('btn');
        basketLinkEl.setAttribute('href', '#');
        basketLinkEl.textContent = 'Перейти к оформлению';
        basketContentEl.append(basketLinkEl);

        basketContentEl.querySelectorAll('.basket__item-close').forEach(element => {
            element.addEventListener('click', function (e) {
                basket.remove(this.dataset.id);
                showBasketContent();
                e.stopPropagation();
            });
        });
    }
}

const clearFilter = () => {
    pendantEl.checked = false;
    ceilingEl.checked = false;
    overheadEl.checked = false;
    pointEl.checked = false;
    nightlightsEl.checked = false;
    filterAvailableEl.checked = false;
    filterAllEl.checked = true;
}

// показать модальное окно обработки заявки
const showMessageModal = (message) => {
    const messageEl = document.querySelector('.questions__message');
    messageEl.querySelector('.questions__message-text').textContent = message;
    messageEl.querySelector('.questions__message-close').addEventListener('click', function (e) {
        const closeEl = document.querySelector('.questions__message');
        closeEl.classList.remove('questions__message--active');
    });

    messageEl.classList.add('questions__message--active');
}

window.addEventListener('DOMContentLoaded', async () => {
    // настроить реакцию на выбор города
    document.querySelectorAll('.location__subitem').forEach(element => {
        element.addEventListener('click', (e) => {
            locationCityNameEl.textContent = element.textContent.trim();
            locationCityBtnEl.classList.remove('location__city--active');
            updateProductsInfo();
        });
    });

    //настроить аккордеон ответов
    document.querySelectorAll('.accordion__btn').forEach(element => {
        element.addEventListener('click', (e) => {
            const accBtnEl = document.querySelectorAll('.accordion__btn');
            accBtnEl.forEach(btn => {
                if (btn != element) {
                    btn.classList.remove('accordion__btn--active');
                }
            });

            element.classList.toggle('accordion__btn--active');
        });
    });

    // настройка реакции на сортировку товаров
    sortListSelectEl.addEventListener('change', () => updateProductsInfo());

    // настройка реакции на выбор категории товара
    filterItemsEl.forEach(element => {
        element.firstElementChild.firstElementChild.addEventListener('click', () => updateProductsInfo());
    });

    filterAvailableEl.addEventListener('click', () => updateProductsInfo());
    filterAllEl.addEventListener('click', () => updateProductsInfo());
    document.querySelector('.catalog-form__reset').addEventListener('click', (e) => { clearFilter(); updateProductsInfo(); e.preventDefault(); });

    updateProductsInfo();

    // секция товаров дня
    await showDayProductCards(dataLink);
    addToBasketEvent(document.querySelector('.day-products__list'));
    // подключение слайдера для товаров дня
    const swiper = new Swiper('.swiper', {
        speed: 400,
        spaceBetween: 40,
        slidesPerView: 4,
        navigation: {
            nextEl: '.day-products__navigation-btn--next',
            prevEl: '.day-products__navigation-btn--prev',
        },
    });

    // валидация формы заявки
    const validator = new JustValidate('.questions__form');
    validator
        .addField('#name', [
            {
                rule: 'required',
            },
            {
                rule: 'minLength',
                value: 3,
            },
            {
                rule: 'maxLength',
                value: 15,
            },
        ])
        .addField('#email', [
            {
                rule: 'required',
            },
            {
                rule: 'required',
            },
            {
                rule: 'email',
            },
        ])
        .addField('#agree', [
            {
                rule: 'required',
            },
        ]);

    // обработка отправки формы заявки
    const validateForm = document.querySelector('.questions__form');
    validateForm.addEventListener('submit', function (e) {
        if (validator.isValid)
            try {
                const formData = new FormData(validateForm);
                formData.set('login', 'mylogin');
                formData.set('pass', 'mypass');

                const response = fetch(validateForm.action, {
                    method: 'POST',
                    body: formData
                })
                    .then((response) => {
                        showMessageModal('Благодарим за обращение!');
                        return response;
                    })
                    .then(data => data)
                    .catch(() => {
                        showMessageModal('Не удалось отправить сообщение!')
                    });

                e.preventDefault();
            } catch (error) {
                console.log(error);
            }
    });
});
