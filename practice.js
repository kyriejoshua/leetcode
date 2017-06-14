/****** EASY PART ******/
/****** 557. Reverse Words in a String III ******/
/**
 * [reverseWords description]
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
  var arr = s.split(' ');
  arr = arr.map(function(str){
    var temp = str.split('');
    temp.reverse();
    return temp.join('');
  });
  return arr.join(' ');
};

/*
  var reverseWords = function(str) {
    str = str.trim();
    str = str.replace(/\s+/g, ' ');
    var arr = str.split(' ').reverse();
    return arr.join(' ');
  };
 */

/****** 551. Student Attendance Record I ******/
/**
 * [checkRecord 声明了太多变量 bad]
 * @param {string} s
 * @return {boolean}
 */
/**
 */
var checkRecord = function(s) {
  var arr = s.split('');
  var numA = 0;
  var numL = 0;
  var lIndex = -1;
  var isLate = false;
  arr.forEach(function(value, index){
    if (value === 'A') {
      return numA++;
    }
    if (value === 'L' && ((lIndex === -1) || (lIndex === (index-1)))) {
      lIndex = index;
      numL++;
      if (numL > 2) {isLate = true;}
      return;
    }
    numL = 0;
    lIndex = -1;
  });
  return !(isLate || (numA > 1));
};

/**
 * [checkRecord 尝试简化, 两个A，中间可夹杂任意数值或者连续三个 L，这类题都可以用正则来实现]
 * @param  {String} s [description]
 * @return {Boolean}   [description]
 */
var checkRecord = function(s) {
  var RECORD_REG = /A+.*A+|(LLL)+/;
  return !RECORD_REG.test(s);
};

/****** 520. Detect Capital ******/
/**
 * [detectCapitalUse 注意三条规则，和下文的推荐答案比起来是很丢人了]
 * @param {string} word
 * @return {boolean}
 */
var detectCapitalUse = function(word) {
  var CAPITAL_REG = /[A-Z]/; // [A-Z] 不是 A-Z
  var arr = word.split('');
  var isUpperCount = 0;
  var isLowerCount = 0;
  var isRight;
  arr.forEach(function(value, index) {
    if (CAPITAL_REG.test(value)) {isUpperCount++;}
    if (!CAPITAL_REG.test(value)) {isLowerCount++;}
  });
  // rule 1 2 3
  isRight = isUpperCount === arr.length || (CAPITAL_REG.test(arr[0]) && (isLowerCount+1) === arr.length) || isLowerCount === arr.length;
  return isRight;
};

/**
  var detectCapitalUse = function(word) {
    var CAPITAL_REG = /^([A-Z]{1}[a-z]+|[A-Z]+|[a-z]+)$/;
    return CAPITAL_REG.test(word);
  };
 */

/****** 506. Relative Ranks ******/
/**
 * [findRelativeRanks 将前三名换成奖牌，将其他分数转换成名次，目测该方法在数组长度小时是可以实现的，但在目前 10000 的限制下，显示时间超时]
 * @param {number[]} nums
 * @return {string[]}
 */
var findRelativeRanks = function(nums) {
  var obj = {};
  var arr = JSON.parse(JSON.stringify(nums)); // 深拷贝
  arr.sort(function(a, b) {return b - a;}); // a > b 的排序存在问题
  arr.forEach(function(value, index) {
    if (index === 0) {obj[value] = 'Gold Medal'; return;}
    if (index === 1) {obj[value] = 'Silver Medal'; return;}
    if (index === 2) {obj[value] = 'Bronze Medal'; return;}
    obj[value] = String(index+1);
  });
  return nums.map(function(value) {
    var v;
    // 可能是这一步导致了算法复杂度升高，导致运算时间超时
    for (var key in obj) {
      // 类型转换在这里是必要的，否则将会是 number 和 string 的判断
      if (String(value) === key) {
        v = obj[key];
      }
    }
    return v;
  });
};

/**
 * [findRelativeRanks 思路更清晰]
 */
var findRelativeRanks = function(nums) {
  var arr = [];
  // 保存索引值，成绩，及排名的各对象的数组
  nums.forEach(function(value, index){
    arr.push({
      index: index,
      value: value,
      rank: null
    });
  });
  // 按成绩进行排序
  arr.sort(function(a, b) {return b.value - a.value;});
  // 获取排名
  arr.map(function(value, index) {
    if (index === 0) {value.rank = 'Gold Medal'; return;}
    if (index === 1) {value.rank = 'Silver Medal'; return;}
    if (index === 2) {value.rank = 'Bronze Medal'; return;}
    value.rank = index + 1 + '';
  });
  // 按索引值从小打大重新排名
  arr.sort(function(a, b){return a.index - b.index;});
  // 直接修改数组并返回
  return arr.map(function(value){
    return value.rank;
  });
  // 保存结果
  // var res = [];
  // arr.forEach(function(value) {
  //   res.push(value.rank);
  // });
  // return res;
};

/****** 501. Base 7 ******/
/**
 * [convertToBase7 下列代码可以实现，但显然并不考验算法……]
 * @param {number} num
 * @return {string}
 */
var convertToBase7 = function(num) {
  num.toString(7);
};

// error
var convertToBase7 = function(num) {
  var res = arguments[1] || [];
  var ceil = Math.floor(num/7);
  res.push(num % 7);
  // 这里不知为何 return 不出去
  if (ceil === 0) {return res.reverse().join('');}
  convertToBase7(ceil, res);
};

// correct
var convertToBase7 = function(num) {
  if (num === 0) {return '0';}
  var res = [];
  var base = 7;
  var prefix = num < 0 ? '-' : '';
  // 取绝对值
  num = Math.abs(num);
  // 当 num 不为 0 时，反复调用
  while (num) {
    res.push(num % base);
    num = Math.floor(num / base); // num = ~~(num/base) 同效果
  }
  return prefix + res.reverse().join('');
};
