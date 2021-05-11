// for of
/* let obj = { x: "1", y: "2", z: "3" };
let keys = "";
for (const key of Object.keys(obj)) {
  keys += key;
}
console.log("--", keys);
let values = "";
for (const value of Object.values(obj)) {
  values += value;
}
console.log("==", values);
let entries = "";

for (const [k, v] of Object.entries(obj)) {
  entries += k + v;
}
console.log("$$", Object.entries(obj));
console.log("&&", entries); */

// for of 字符串
// 统计重复字符
/* let msg = "kkbaaavbtyy";
let count = {};
for (const letter of msg) {
  if (count[letter]) {
    count[letter]++;
  } else {
    count[letter] = 1;
  }
}
console.log("count", count);
 */
// for of set

/* let msg = "Na na na na ba ba foo baz";
let wordSet = new Set(msg.split(" "));
let unique = [];
for (const word of wordSet) {
  unique.push(word);
}

console.log("un", unique);
 */

// for of map 迭代的是map的键值对，类似对象的结构用法
