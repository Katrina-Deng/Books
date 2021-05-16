/*
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-05-16 14:57:45
 * @LastEditors: Ellen
 * @LastEditTime: 2021-05-16 15:12:55
 */
/**
 * @name: Ellen
 * @param {*} a
 * @param {array} args 他是一个函数
 * @return {*}
 */
const map = function (a, ...args) {
  return a.map(...args);
};
/**
 * @name: Ellen
 * @param {*} a
 * @param {array} args他是一个函数
 * @return {*}
 */
const reduce = function (a, ...args) {
  return a.reduce(...args);
};

const sum = (x, y) => x + y;
const square = (x) => x * x;
let data = [1, 1, 3, 5, 5];
let mean = reduce(data, sum) / data.length;
console.log("mean", mean);
let devi = map(data, (x) => x - mean);
console.log("devi", devi);
let res = Math.sqrt(reduce(map(devi, square), sum) / (data.length - 1));
console.log("res", res);

// 高阶函数
function foo(f) {
  return (a) => map(a, f);
}

let bar = foo((x) => x * 2);
let baz = bar([1, 2, 3]);
console.log("baz", baz);
