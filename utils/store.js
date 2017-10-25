let store     = {};
store.setItem = (itemName, itemData) => {
    let data = JSON.stringify(itemData);
    window.localStorage.setItem(itemName, data);
    return true;
};
store.getItem = itemName => {
    let data = window.localStorage.getItem(itemName);
    return JSON.parse(data);
};