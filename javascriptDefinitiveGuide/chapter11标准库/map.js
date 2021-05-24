/*
 * @Des: map
 * @Version:
 * @Author: Ellen
 * @Date: 2021-05-24 11:15:11
 * @LastEditors: Ellen
 * @LastEditTime: 2021-05-24 11:50:45
 */
let n = new Map([
  ["one", 1],
  ["two", 2],
]);
let copy = new Map(n);
// console.log("n", n.entries());
let obj = {
  x: 1,
  y: 2,
};
let mapVal = new Map(Object.entries(obj));
console.log("mapGet", mapVal.get("x"));
console.log("mapGet", mapVal.get("y"));
// console.log("mapGet", mapVal.set(["z", 3]));
console.log("mapSet", mapVal.set("z", 3));
console.log("map", mapVal.size);
