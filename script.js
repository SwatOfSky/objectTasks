//проверяет объект ли это и если да - true
const data = { a: 1 };

const isPlainObject = (element) => typeof element === 'object' && !Array.isArray(element) && element !== null;

console.log(isPlainObject(data));

//превращает объект в массив
const data1 = { a: 1, b: 2 };

const makePairs = (object) => Object.keys(object).map((el) => [el, object[el]]);

console.log(makePairs(data1));

//убирает из фиального объекта что не надо
const data2 = { a: 1, b: 2, c: 3 };
const without = (object, ...args) => {
    const newObject = { ...object };

    args.forEach((arg) => {
        delete newObject[arg];
    });
    return newObject
}
console.log(without(data2, 'a', 'c'));

//проверят пустой ли объект
const data3 = { a: 1, b: undefined };
const data4 = { a: undefined };
const isEmpty = (object) => {
    const objectKeys = Object.keys(object);
    if (objectKeys.length === 0) {
        return true;
    } 
    return !objectKeys.filter((key) => object[key] || object[key] === 0 || object[key] === false).length;
};
console.log(isEmpty(data3));
console.log(isEmpty(data4));

//проверяет массивы на одинаковость
const data5 = { a: 1, b: 1 };
const data6 = { a: 1, b: 1 };
const data7 = { a: 1, b: 2 };
const isEqual = (firstObj, secondObj) => {
    const firstObjKeys = Object.keys(firstObj);
    const secondObjKeys = Object.keys(secondObj);
    if(firstObjKeys.length != secondObjKeys.length){
        return false;
    }
    return !firstObjKeys.filter((key) => firstObj[key] !== secondObj[key]).length;
};
console.log(isEqual(data5, data6)); // true
console.log(isEqual(data5, data7)); // false

//вызывает метод массива на заданный путь объекта
const data8 = { a: { b: [1, 2, 3] } }

const invoke = (object, path, func, args) => {
    const splittedPath = path.split('.');
    const target = splittedPath.reduce((acc, key) => {
        acc = acc[key] ? acc[key] : object[key];
        return acc;
    }, {});
    return Array.prototype[func].apply(target, args);
};

console.log(invoke(data8, 'a.b', 'splice', [1, 2])); // [2, 3]