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

/****** 504. Base 7 ******/
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

/****** 501. Find Mode in Binary Search Tree ******/
//  lack

/****** 500. Keyboard Row ******/
/**
 * [findWords 查找由键盘里同一行字母组成的字母]
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function(words) {
  var ROW_EXP1 = /^[QWERTYUIOP]+$/;
  var ROW_EXP2 = /^[ASDFGHJKL]+$/;
  var ROW_EXP3 = /^[ZXCVBNM]+$/;
  // 用 forEach 匹配添加数组同理
  return words.filter(function(value) {
    return ROW_EXP1.test(value.toUpperCase()) || ROW_EXP2.test(value.toUpperCase()) || ROW_EXP3.test(value.toUpperCase());
  });
};

// 更加简化
var findWords = function(words) {
  // 必须从头到尾都匹配，所以这里不行
  // var ROW_EXP = /^([QWERTYUIOP]+)|([ASDFGHJKL]+)|([ZXCVBNM]+)$/;
  var ROW_EXP = /(^([QWERTYUIOP]+)$)|(^([ASDFGHJKL]+)$)|(^([ZXCVBNM]+)$)/;
  return words.filter(function(value) {
    return ROW_EXP.test(value.toUpperCase());
  });
};

/* 个人认为该答案过于啰嗦, 三重遍历
  var findWords = function(words) {
    let keys = [
      'qwertyuiop',
      'asdfghjkl',
      'zxcvbnm'
    ];

    let ans = [];

    words.forEach(function(item) {
      let s = new Set();
      let word = item.toLowerCase();

      // 对单词的每个字母操作
      for (let letter of word) {
        for (let i = 0; i < 3; i++)
          if (keys[i].indexOf(letter) !== -1) {
            // 加当前行的值, 如果都在一行内，则最终保存的只有一个
            s.add(i);
            break;
          }
      }

      // 如果都在一行内，仅保留一行的值，PS：没括号？
      if (s.size === 1)
        ans.push(item);
    });

    return ans;
  };
*/

/****** 496. Next Greater Element I ******/
/**
 * [nextGreaterElement 子数组获取到在父数组中的离右侧最近的更大的值]
 * @param {number[]} findNums
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElement = function(findNums, nums) {
  return findNums.map(function(num) {
    var currentValue = -1; // 保存的数组值
    var isSearching = false; // 用以标识是否开启查找循环
    nums.forEach(function(value) {
      // 循坏查找还未开始，先找到父数组中对应的值
      if (num === value) {isSearching = true;return;}
      if (!isSearching) {return;}
      // 获取到最近的最大值，获取到后便停止循环
      if (num < value) {
        currentValue = value;
        isSearching = false;
        return;
      }
    });
    return currentValue;
  });
};

// 用 ES6 实现
var nextGreaterElement = function (findNums, nums) {
  return findNums.map((num) => {
    let res, currentIndex, tempArr;
    // 获取子数组在父数组的索引值
    currentIndex = nums.findIndex((value) => {
      return num === value;
    });
    // 截取父数组的索引值之后的部分进行查找
    tempArr = nums.slice(currentIndex);
    res = tempArr.find((value) => {
      return num < value;
    });
    // 未查找到时是返回 undefined
    return res || -1;
  });
};

/* 都用 ES6 了为啥不上 Array api
  var nextGreaterElement = function (findNums, nums) {
    let ans = [];
    let len = nums.length;

    findNums.forEach((item) => {
      let pos = nums.indexOf(item);
      let hasNextGreatElement = false;

      for (let i = pos + 1; i < len; i++) {
        if (nums[i] > item) {
          ans.push(nums[i]);
          hasNextGreatElement = true;
          break;
        }
      }

      if (!hasNextGreatElement) {
        ans.push(-1);
      }

      return ans;
    })
  }
*/
