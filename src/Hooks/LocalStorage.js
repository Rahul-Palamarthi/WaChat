function setLocalStroage(key, val) {
    const val2 = getLocalStorage(key);
    const res = val2.filter((value) => value.num !== val);

    const obj = [...res, { id: res.length, num: val }];

    localStorage.setItem(key, JSON.stringify(obj));
}

function getLocalStorage(key) {
    const val = localStorage.getItem(key);
    if (val == null) {
        localStorage.setItem(key, JSON.stringify([]));
        return [];
    }
    return JSON.parse(val);
}

export { setLocalStroage, getLocalStorage };
