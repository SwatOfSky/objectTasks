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

//проверяет пустой ли объект
const data9 = { a: { b: undefined } };
const data10 = { a: { b: 1 } };
const isEmptyDeep = (element) => {
    if (element === null) {
      return true;
    }
    if (Array.isArray(element)) {
      if (element.length === 0) {
        return true;
      }
      let result;
      for (let i = 0; i < element.length; i += 1) {
        if (typeof element[i] === 'boolean' || (typeof element[i] === 'number' && !Number.isNaN(element[i]))
          || (typeof element[i] === 'string' && element[i] !== '')) {
          result = false;
          break;
        }
        if (Array.isArray(element[i]) || (typeof element[i] === 'object' && element[i] !== null)) {
          result = isEmptyDeep(element[i]);
          break;
        }
        result = true;
      }
      return result;
    }
    if (typeof element === 'object') {
      const objectKeys = Object.keys(element);
      if (objectKeys.length === 0) {
        return true;
      }
      let result;
      for (let i = 0; i < objectKeys.length; i += 1) {
        const value = element[objectKeys[i]];
        if (typeof value === 'boolean' || (typeof value === 'number' && !Number.isNaN(value))
          || (typeof value === 'string' && value !== '')) {
          result = false;
          break;
        }
        if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {
          result = isEmptyDeep(value);
          break;
        }
        result = true;
      }
      return result;
    }
  };
console.log(isEmptyDeep(data9));
console.log(isEmptyDeep(data10));

//делает глубокое сравнение объектов
const dataX = { a: 1, b: { c: 1 } };
const dataY = { a: 1, b: { c: 1 } };
const dataZ = { a: 1, b: { c: 2 } };

const isEqualDeep = (firstObj, secondObj) => {
    const firstObjKeys = Object.keys(firstObj);
    const secondObjKeys = Object.keys(secondObj);
  
    if (firstObjKeys.length === 0 && secondObjKeys.length === 0) {
      return true;
    }
  
    const compareList = firstObjKeys.map((key) => {
      const valueOfFirstObject = firstObj[key];
      const valueOfSecondObject = secondObj[key];
      if ((Number.isNaN(valueOfFirstObject) && Number.isNaN(valueOfSecondObject))
        || (valueOfFirstObject === null && valueOfSecondObject === null)) {
        return true;
      }
      if (valueOfFirstObject === valueOfSecondObject) {
        return true;
      }
      if (Array.isArray(valueOfFirstObject) && Array.isArray(valueOfSecondObject)) {
        return isArraysEqualDeep(valueOfFirstObject, valueOfSecondObject);
      }
      if (typeof valueOfFirstObject === 'object' && typeof valueOfSecondObject === 'object') {
        return isEqualDeep(valueOfFirstObject, valueOfSecondObject);
      }
  
      return false;
    });
  
    return !compareList.includes(false) && !compareList.includes(undefined);
  };
  
  const isArraysEqualDeep = (firstArray, secondArray) => {
    if (firstArray.length !== secondArray.length) {
      return false;
    }
  
    const compared = firstArray.map((el, id) => {
      if (Array.isArray(el) && Array.isArray(secondArray[id])) {
        return isArraysEqualDeep(el, secondArray[id]);
      }
      if (typeof el === 'object' && typeof secondArray[id] === 'object') {
        return isEqualDeep(el, secondArray[id]);
      }
  
      return secondArray[id] === el;
    });
  
    return !compared.includes(false);
  };

console.log(isEqualDeep(dataX, dataY));
console.log(isEqualDeep(dataX, dataZ));