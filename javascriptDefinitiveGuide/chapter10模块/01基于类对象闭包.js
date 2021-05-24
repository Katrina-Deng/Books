/*
 * @Des: require js 打包工程化的基本原理
 * @Version:
 * @Author: Ellen
 * @Date: 2021-05-19 23:06:13
 * @LastEditors: Ellen
 * @LastEditTime: 2021-05-19 23:32:39
 */
/**
 * @name: Ellen
 * @test: test font
 * @msg: 抽象set 类 基类
 * @param {*}
 * @return {*}
 */
class AbstractSet {
  // Throw an error here so that subclasses are forced
  // to define their own working version of this method.
  has(x) {
    throw new Error("Abstract method");
  }
}

/**
 * @name: Ellen
 * @test: test font
 * @msg: noSet 类 继承基类 只有has toString 方法
 * @param {*}
 * @return {*}
 */
class NotSet extends AbstractSet {
  constructor(set) {
    super();
    this.set = set;
  }

  // Our implementation of the abstract method we inherited
  has(x) {
    return !this.set.has(x);
  }
  // And we also override this Object method
  toString() {
    return `{ x| x ∉ ${this.set.toString()} }`;
  }
}

/**
 * @name: Ellen
 * @test: test font
 * @msg: RangeSet 类继承 AbstractSet 提供范围判断 toString() 方法
 * @param {*}
 * @return {*}
 */
class RangeSet extends AbstractSet {
  constructor(from, to) {
    super();
    this.from = from;
    this.to = to;
  }

  has(x) {
    return x >= this.from && x <= this.to;
  }
  toString() {
    return `{ x| ${this.from} ≤ x ≤ ${this.to} }`;
  }
}

/*
 * AbstractEnumerableSet is an abstract subclass of AbstractSet.  It defines
 * an abstract getter that returns the size of the set and also defines an
 * abstract iterator. And it then implements concrete isEmpty(), toString(),
 * and equals() methods on top of those. Subclasses that implement the
 * iterator, the size getter, and the has() method get these concrete
 * methods for free.
 */
/**
 * @name: Ellen
 * @test: test font
 * @msg: 可枚举的抽象类 继承 抽象set类 noset rangeset都是不可枚举
 * @method  get  [Symbol.iterator] reuqire  isEmpty  toString equals
 * @param {*}
 * @return {*} boolean
 */
class AbstractEnumerableSet extends AbstractSet {
  get size() {
    throw new Error("Abstract method");
  } // 必须实现的方法
  [Symbol.iterator]() {
    throw new Error("Abstract method");
  } // 必须实现的方法

  isEmpty() {
    return this.size === 0;
  }
  toString() {
    return `{${Array.from(this).join(", ")}}`;
  }
  equals(set) {
    // If the other set is not also Enumerable, it isn't equal to this one
    if (!(set instanceof AbstractEnumerableSet)) return false;

    // If they don't have the same size, they're not equal
    if (this.size !== set.size) return false;

    // Loop through the elements of this set
    for (let element of this) {
      // If an element isn't in the other set, they aren't equal
      if (!set.has(element)) return false;
    }
    // The elements matched, so the sets are equal
    return true;
  }
}

/*
 * SingletonSet is a concrete subclass of AbstractEnumerableSet.
 * A singleton set is a read-only set with a single member.
 */
/**
 * @name: Ellen
 * @test: test font
 * @msg: 单一成员的集合 继承 AbstractEnumerableSet
 * @param {*}
 * @return {*}
 */
class SingletonSet extends AbstractEnumerableSet {
  constructor(member) {
    super();
    this.member = member;
  }

  // We implement these three methods, and inherit isEmpty, equals()
  // and toString() implementations based on these methods.
  has(x) {
    return x === this.member;
  }
  get size() {
    return 1;
  }
  *[Symbol.iterator]() {
    yield this.member;
  }
}

/*
 * AbstractWritableSet is an abstract subclass of AbstractEnumerableSet.
 * It defines the abstract methods insert() and remove() that insert and
 * remove individual elements from the set, and then implements concrete
 * add(), subtract(), and intersect() methods on top of those. Note that
 * our API diverges here from the standard JavaScript Set class.
 */
/**
 * @name: Ellen
 * @test: test font
 * @msg: 可写抽象集合 继承抽象可枚举结合
 * @method:  get  [Symbol.iterator](父类)  insert remove reuqire
 * @param {*}
 * @return {*}
 */
class AbstractWritableSet extends AbstractEnumerableSet {
  insert(x) {
    throw new Error("Abstract method");
  }
  remove(x) {
    throw new Error("Abstract method");
  }

  add(set) {
    for (let element of set) {
      this.insert(element);
    }
  }

  subtract(set) {
    for (let element of set) {
      this.remove(element);
    }
  }
  //   去重
  intersect(set) {
    for (let element of this) {
      if (!set.has(element)) {
        this.remove(element);
      }
    }
  }
}

/**
 * A BitSet is a concrete subclass of AbstractWritableSet with a
 * very efficient fixed-size set implementation for sets whose
 * elements are non-negative integers less than some maximum size.
 */

/**
 * @name: Ellen
 * @test: test font
 * @msg: BitSet 不是抽象类和内置类，他是具体类，要实现父类以及继承父类的抽象方法
 * @param {*}
 * @return {*}
 */
class BitSet extends AbstractWritableSet {
  constructor(max) {
    super();
    this.max = max; // The maximum integer we can store.
    this.n = 0; // How many integers are in the set
    this.numBytes = Math.floor(max / 8) + 1; // How many bytes we need
    this.data = new Uint8Array(this.numBytes); // The bytes
    // Uint8Array 8 位无符号整数值的类型化数组。内容将初始化为 0。如果无法分配请求数目的字节，则将引发异常。
  }

  // Internal method to check if a value is a legal member of this set
  _valid(x) {
    return Number.isInteger(x) && x >= 0 && x <= this.max;
  }

  // Tests whether the specified bit of the specified byte of our
  // data array is set or not. Returns true or false.
  _has(byte, bit) {
    return (this.data[byte] & BitSet.bits[bit]) !== 0;
  }

  // Is the value x in this BitSet?
  has(x) {
    if (this._valid(x)) {
      let byte = Math.floor(x / 8);
      let bit = x % 8;
      return this._has(byte, bit);
    } else {
      return false;
    }
  }

  // Insert the value x into the BitSet
  insert(x) {
    if (this._valid(x)) {
      // If the value is valid
      let byte = Math.floor(x / 8); // convert to byte and bit
      let bit = x % 8;
      if (!this._has(byte, bit)) {
        // If that bit is not set yet
        this.data[byte] |= BitSet.bits[bit]; // then set it
        this.n++; // and increment set size
      }
    } else {
      throw new TypeError("Invalid set element: " + x);
    }
  }

  remove(x) {
    if (this._valid(x)) {
      // If the value is valid
      let byte = Math.floor(x / 8); // compute the byte and bit
      let bit = x % 8;
      if (this._has(byte, bit)) {
        // If that bit is already set
        this.data[byte] &= BitSet.masks[bit]; // then unset it
        this.n--; // and decrement size
      }
    } else {
      throw new TypeError("Invalid set element: " + x);
    }
  }

  // A getter to return the size of the set
  get size() {
    return this.n;
  }

  // Iterate the set by just checking each bit in turn.
  // (We could be a lot more clever and optimize this substantially)
  *[Symbol.iterator]() {
    for (let i = 0; i <= this.max; i++) {
      if (this.has(i)) {
        yield i;
      }
    }
  }
}
