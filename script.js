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