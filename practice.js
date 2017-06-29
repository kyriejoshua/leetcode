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

/****** 492. Construct the Rectangle ******/
/**
 * [constructRectangle description]
 * @param {number} area
 * @return {number[]}
 */
// error 超时
var constructRectangle = function(area) {
  if (area === 1) {return [1, 1];}
  var L, W, min;
  var half = Math.floor(area/2);
  var arr = [];
  var tempArr = [];
  for (var i = 0; i <= half; i++) { // W
    for (var j = area; j >= i; j--) { // L
      // 获取所有乘积为 area 的宽高值，并保存
      if ((i * j) === area) {
        arr.push([i, j]);
      }
    }
  }
  // 将所有差值保存在数组里
  arr.forEach(function(item) {
    tempArr.push(item[1]-item[0]);
  });
  // 获取相差最小的值
  min = Math.min.apply(null,tempArr);
  arr.forEach(function(item) {
    if ((item[1] - item[0]) === min) {
      L = item[1];
      W = item[0];
    }
  });
  return [L, W];
};

// error 超时
var constructRectangle = function(area) {
  if (area === 1) {return [1, 1];}
  var min = area;
  var half = Math.floor(area/2);
  var arr = [];
  for (var i = 1; i <= half; i++) { // W
    for (var j = area; j >= i; j--) { // L
      // 获取所有乘积为 area 的宽高值，并比较差值后保存
      if ((i * j) === area) {
        if ((j - i) < min) {
          min = j - i;
          arr = [j, i];
        }
      }
    }
  }
  return arr;
};

// error 超时
var constructRectangle = function(area) {
  if (area === 1) {return [1, 1];}
  var min = area;
  var half = Math.floor(area/2);
  var arr = [];
  for (var i = 1; i <= half; i++) { // W
    var isSatified = false;
    for (var j = area; j >= i; j--) { // L
      // 获取所有乘积为 area 的宽高值，并比较差值后保存
      if ((i * j) !== area) {
        continue; // break;
      }
      if ((j - i) > min) {
        continue; // break;
      }
      min = j - i;
      arr = [j, i];
      isSatified = true;
      break;
    }
    if (min === 0) {
      break;
    }
    if (isSatified) {
      continue;
    }
  }
  return arr;
};

// correct 完全忘了 sqrt 这个 api 了。
var constructRectangle = function(area) {
  var half = Math.ceil(Math.sqrt(area));
  for ( ; ; half++) { // 学习这个写法
    if (area % half === 0)
      return [half, area / half];
  }
};

/****** 485. Max Consecutive Ones ******/
/**
 * [findMaxConsecutiveOnes 找到最多连续的1的连续数]
 * @param {number[]} nums
 * @return {number}
 */
// 可以实现但太啰嗦
var findMaxConsecutiveOnes = function(nums) {
  // 数组长度为 1 的情况
  if (nums.length === 1) {
    return nums[0];
  }
  var recent = 0;
  var count = 0;
  var arr = [];
  for (var i = 0; i < nums.length; i++) {
    // 遇到 0 时都保存并重置
    if (nums[i] === 0) {
      arr.push(count);
      recent = 0;
      count = 0;
      continue;
    }
    // 如果是连续的 1
    if (nums[i] === recent) {
      count++;
      // 如果 1 恰好是最后
      if (i === nums.length -1) {
        arr.push(count);
      }
      continue;
    }
    // 首次遇见 1
    recent = 1;
    count = 1;
    // 存在有且仅有 1 的情况
    arr.push(count);
  }
  return Math.max.apply(null, arr);
};

var findMaxConsecutiveOnes = function(nums) {
  var ans = 0;
  var sum = 0;
  // 避免数组只有一个元素的情况
  nums.push(0);
  for (var item of nums) {
    // 如果是 1
    if (item) {
      sum++;
    } else {
      // 获取连续的最大值并重置
      ans = Math.max(ans, sum);
      sum = 0;
    }
  }
  return ans;
};

/****** 476. Number Complement ******/
/**
 * [findComplement description]
 * @param {number} num
 * @return {number}
 */
var findComplement = function(num) {
  // 转为 2 进制
  var binary = num.toString(2);
  var arr = binary.split('');
  var res = arr.map(function(value) {
    // 字符串类型转化为数字类型，且取反
    return Number(value) ? 0 : 1;
  });
  // 再转为 10 进制，这里不需要再用 Number,否则会影响首位为 0 的情况
  // toString(10) 和 toString() 是一样的，具有同等效果
  return parseInt(res.join(''), 2);
};

/* 没看懂，后续补上
  var findComplement = function(num) {
    let ans = 0;
    let add = 1;

    while (num) {
      if (!(num & 1)) {
        ans += add;
      }
      num >>= 1;
      add <<= 1;
    }

    return ans;
  }
*/

/****** 475. Heaters ******/
/**
 * [findRadius description]
 * @param {number[]} houses
 * @param {number[]} heaters
 * @return {number}
 */
// error
var findRadius = function(houses, heaters) {
  var previous = 0;
  var radius = 0;
  for (var i = 1; i < houses[houses.length-1]; i++) {
    if (heaters.length === 1) {
      if (heaters[0] === i) {
        radius = Math.max(i, houses.length - 1 - i - 1);
      }
      return;
    }
    heaters.forEach(function(heater) {
      if (heater === i) {
        radius = Math.max(radius, (i - previous)/2);
        previous = i;
      }
    });
  }
  return radius;
};

// correct 难度高一点，理解不是很好
var findRadius = function(houses, heaters) {
  // 排序
  houses.sort(function(a, b) {return a - b;});
  heaters.sort(function(a, b) {return a - b;});

  var housesLen = houses.length;
  var heatersLen = heaters.length;
  var j = 0;
  var ans = 0;

  for (var i = 0; i < housesLen; i++) {
    var pos = houses[i];
    var minDis = Infinity;

    // 取得最右处加热器的位置？
    while(heaters[j] < pos && j < heatersLen - 1) {
      j++;
    }

    // 和左边的房子位置比较
    j > 0 && (minDis = Math.min(minDis, Math.abs(pos - heaters[j-1])));
    // 和右边的房子位置比较
    minDis = Math.min(minDis, Math.abs(heaters[j] - pos));

    // 和上一轮的循环比较
    ans = Math.max(ans, minDis);

    // 往左递减？
    j > 0 && j--;
  }

  return ans;
};

/****** 463. Island Perimeter ******/
// lack

/****** 461. Hamming Distance ******/
/**
 * [hammingDistance description]
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance = function(x, y) {
  var str1 = x.toString(2).split('');
  var str2 = y.toString(2).split('');
  var diff = 0;
  var temp = Math.abs(str1.length - str2.length);
  // 位数等同
  if (str1.length > str2.length) {
    for (var i = 0; i < temp; i++) {
      str2.unshift(0);
    }
  } else {
    for (var j = 0; j < temp; j++) {
      str1.unshift(0);
    }
  }
  str1.forEach(function(value, index) {
    str2.forEach(function(item, num) {
      if (index !== num) {
        return;
      }
      if (Number(value) === Number(item)) {
        return;
      }
      diff++;
    });
  });
  return diff;
};

/* 待理解
  var hammingDistance = function(x, y) {
    let ans = 0;
    while (x || y) {
      ans += (x & 1) ^ (y & 1);
      x >>= 1;
      y >>= 1;
    }
    return ans;
  }
 */

/****** 459. Repeated Substring Pattern ******/
/**
 * [repeatedSubstringPattern description]
 * @param {string} s
 * @return {boolean}
 */
// 可以解决，但超时，遍历上万长度的字符串时耗费时间很长
var repeatedSubstringPattern = function(s) {
  var len = Math.ceil(s.length/2);
  for (var i = 0; i <= len; i++) {
    var temp = s.substr(0, i);
    var REPEATSTR_REG = new RegExp('^(' + temp + '){2,}$');
    if (REPEATSTR_REG.test(s)) {
      return true;
    }
  }
  return false;
};

// correct 改进
var repeatedSubstringPattern = function(s) {
  var len = s.length;
  for (var i = 2; i <= len; i++) {
    if (len % i) continue;
    var base = len / i;
    var temp = s.substr(0, base);
    var REPEATSTR_REG = new RegExp('^(' + temp + '){2,}$');
    if (REPEATSTR_REG.test(s)) {
      return true;
    }
  }
  return false;
};

// correct 不断拆分的思路
var repeatedSubstringPattern = function(s) {
  let len = s.length;

  // 循环的写法，循环写在 loop 里
  loop:
  // 字符串依据长度分成多个组
  for (let i = 2; i <= len; i++) {
    // 如果不是整除，继续寻找可以整除的数
    if (len % i) continue;

    // 可以分成的组数
    let partLen = len / i;
    // 每一组的部分
    let base = s.substr(0, partLen);

    // 按数截取相同长度的组，如果内容不同，则继续寻找
    for (let j = partLen; j < len; j += partLen) {
      let sub = s.substr(j, partLen);
      if (base !== sub) continue loop;
    }

    return true;
  }

  return false;
};

/****** 455. Assign Cookies ******/
/**
 * [findContentChildren description]
 * @param {number[]} g [小孩数量]
 * @param {number[]} s [饼干🍪数量]
 * @return {number}
 */
var findContentChildren = function(g, s) {
  // a - b !!! sort 会修改原数组
  g.sort(function(a, b) {return a - b;});
  s.sort(function(a, b) {return a - b;});
  var res = 0;
  var currentIndex = -1;
  var selected;
  g.forEach(function(value) {
    selected = s.find(function(item) {
      return item >= value;
    });
    if (!selected) {return;}
    currentIndex = s.indexOf(selected);
    res++;
    s.splice(currentIndex, 1);
    currentIndex = -1;
  });
  return res;
};

/* 和自己写的大同小异
  var findContentChildren = function(g, s) {
    g.sort(function(a, b) {return a - b;});
    s.sort(function(a, b) {return a - b;});

    let ans = 0;
    let sIndex = 0;
    let sLen = s.length;

    loop:
    for (var i = 0, len = g.length; i < len; i++) {
      let item = g[i];

      for (var j = sIndex; j < sLen; j++) {
        if (s[j] >= item) {
          ans++;
          // 下一个循环开始
          sIndex = j + 1;
          // 结束循环
          if (sIndex === sLen) break loop;
          break;
        }
      }
    }
    return ans;
  }
*/

/****** 453. Minimum Moves to Equal Array Elements ******/
/**
 * [minMoves description]
 * @param {number[]} nums
 * @return {number}
 */
// error 会奔溃
var minMoves = function(nums) {
  nums.sort(function(a, b) {return a - b;});
  var step = 0;
  var len = nums.length;
  var arr, max;
  var isStop = false;
  while (!isStop) {
    arr = nums.map(function(value, index) {
      if (index !== (len-1)) {
        return ++value;
      }
      return value;
    });
    max = Math.max.apply(null, arr);
    isStop = arr.every(function(value) {
      return max === value;
    });
    arr.sort(function(a, b) {return a - b;});
    step++;
  }
  return step;
};

// correct 由推荐答案优化而来
var minMoves = function(nums) {
  var len = nums.length;
  var sum = 0;
  for (var i = 0; i < len; i++) {
    sum += nums[i];
  }
  var min = Math.min.apply(null, nums);
  // x 为需要移动的次数，初始总数加上移动总数，因最后数组内的数相等，所以总是能被数组的长度整除
  // (sum + (len - 1) * x) % len === 0
  // 简化后可得
  // (sum - x) % len === 0
  // 进一步分析，假设被整除的数为 n
  // (sum - x) / len === n
  // (sum - x) / len = n
  // sum - x = len * n
  // x = sum - len * n
  // 这里的 n 为整数，且 n 只能是数组中的最小值，否则就很可能会得出负数的结果
  // 其实这是一道算术解答题…😂
  return sum - len * min;
};

/* correct
  var minMoves = function(nums) {
    var len = nums.length;
    var sum = 0;
    for (var i = 0; i < len; i++) {
      sum += nums[i]
    }

    // 找到初始数组的最小值
    min = Math.min.apply(null, nums);

    // x 为需要移动的次数，初始总数加上移动总数，总是能被数组长度整除
    // (sum + (len - 1) * x) % len === 0
    // 简化后可得，推荐答案只到这一步，详情请看上文
    // (sum - x) % len === 0

    for (var i = 0; ; i++) {
      if ((sum - i) % len) {
        continue;
      }

      // 官方答案，不知为何
      return Math.max(sum - len * min, i);
    }
  };
*/
