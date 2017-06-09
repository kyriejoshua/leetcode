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
