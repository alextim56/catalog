// получение всех товаров
export async function getAll(serverLink) {
    const response = await fetch(serverLink);
    return await response.json();
}

// сортировка товаров по стоимости и популярности
export function sortProducts(orderNumber, item1, item2) {
    switch (orderNumber) {
        case 0:
            return item1.price.new - item2.price.new;
        case 1:
            return item2.price.new - item1.price.new;
        case 2:
            return item2.rating - item1.rating;
    }
}

// получение товаров дня
export async function createDayProductList(dataLink) {
    const products = await getAll(dataLink);
    let filteredData = products.filter(item => item.goodsOfDay == true);
    return filteredData.sort((a, b) => { return sortProducts(0, a, b); });
}

// проверка пересечения массивов типов товаров
export function checkIncludes(typesArray, someType) {
    let typesCount = 0;
    if (typesArray.length == 0) {
        typesCount = 1;
    } else {
        typesCount = someType.filter(x => typesArray.includes(x)).length;
    }
    return typesCount > 0;
}