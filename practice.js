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
// lack

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

/****** 448. Find All Numbers Disappeared in an Array ******/
/**
 * [findDisappearedNumbers description]
 * @param {number[]} nums
 * @return {number[]}
 */
// error 超时
var findDisappearedNumbers = function(nums) {
  nums.sort(function(a, b) {return a - b;});
  var arr = nums.filter(function(value, index, array) {
    return array.indexOf(value) === index;
  });
  var res = [];
  for (var i = 1; i <= nums.length; i++) {
    if ((arr[i-1]) !== i) {
      res.push(i);
      arr.splice(i-1, 0, i);
    }
  }
  return res;
};

// correct
var findDisappearedNumbers = function(nums) {
  var obj = {};
  var res = [];
  // 将其中的值作为对象的属性保存，避免了去重和排序这一步
  nums.forEach(function(item) {
    obj[item] = true;
  });
  for (var i = 1; i <= nums.length; i++) {
    !(obj[i]) && (res.push(i));
  }
  return res;
};

/****** 447. Number of Boomerangs ******/
// lack

/****** 441. Arranging Coins ******/
/**
 * [arrangeCoins description]
 * @param {number} n
 * @return {number}
 */
var arrangeCoins = function(n) {
  var sum = 0;
  for (var i = 0; ; i++) {
    sum += i;
    if (sum < n) {
      continue;
    }
    return sum === n ? i : i - 1;
  }
};

/* 待理解
  var arrangeCoins = function(n) {
    let ans = Math.sqrt(1 + 8 * n) - 1;
    ans /= 2;

    return ~~ans;
  }
*/

/****** 438. Find All Anagrams in a String ******/
/**
 * [findAnagrams description]
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
// error 超时
var findAnagrams = function(s, p) {
  /**
   * [sortStr 将字符串按序排列，这步是关键]
   * @param  {String} str [description]
   * @return {String}     [description]
   */
  function sortStr(str) {
    return str.split('').sort().join('');
  }

  var len = p.length;
  var str = sortStr(p);
  var res = [];

  // 截取每段字符串比较并保存结果
  for (var i = 0; i < s.length; i++) {
    var sub = s.substr(i, len);
    str === sortStr(sub) && res.push(i);
  }

  return res;
};

// correct 待理解 —— 比较每个字符串中字母的数量，将一段字符串字母，分成对象保存，每个属性保存编码，属性值对应出现的次数
// 将 O(20100 * 20100) 复杂度减少为 O(20100 * 26)
// 很开阔的思路，自己可以多尝试
var findAnagrams = function(s, p) {
  let len = p.length;
  let hash = {};
  let ans = {};
  let ret = [];

  // 生成一个对象，以键值对形式保存了每个字母的数字编码和出现次数
  for (let i = 0, l = p.length; i < l; i++) {
    let index = p.charCodeAt(i) - 97;
    // 从开始0递增
    ans[index] = ~~ans[index] + 1;
  }

  for (let i = 0, l = s.length; i < l; i++) {
    let index = s.charCodeAt(i) - 97;
    hash[index] = ~~hash[index] + 1;

    // 在首次判断后执行，将已经过去的那一位移除
    if (i >= len) {
      let index = s.charCodeAt(i - len) - 97;
      hash[index] = ~~hash[index] - 1;
    }

    // 先于上一段执行，首先开始判断是否匹配
    if (i + 1 >= len) {
      help() && ret.push(i - len + 1);
    }
  }

  // 检测是否相等，每一个对应的属性值都需要相等
  function help() {
    for (let i = 0; i < 26; i++) {
      if (~~hash[i] !== ~~ans[i]) {
        return false;
      }
    }
    return true;
  }

  return ret;
};

/****** 437. Path Sum III ******/
// lack

/****** 434. Number of Segments in a String ******/
/**
 * [countSegments description]
 * @param {string} s
 * @return {number}
 */
var countSegments = function(s) {
  // 去除头尾空格
  function trimFirstAndLast(s) {
    return s.replace(/(^\s*)|(\s*$)/g, '');
    // return s.replace(/^(\s*)|(\s*)$/, ''); // 错误写法
  }

  // 将中间的多个空格变为一个
  function trimStr(str) {
    return str.replace(/\s+/g, ' ');
  }

  var str = trimStr(trimFirstAndLast(s));

  if (!str) {
    return 0;
  }

  var arr = str.split(' ');
  return arr.length;
};

/* 更为简洁 利用空字符串布尔值为 false 的特点
   但执行速度没有上一段代码快，是否可以说明正则匹配比遍历循环更快？？？
  var countSegments = function(s) {
    var arr = s.split(' ');
    var res = 0;

    arr.forEach(function(item) {
      item && (res++);
    });

    return res;
  };
*/

/****** 422. Valid Word Square ******/
// lack 打不开

/****** 415. Add Strings ******/
/**
 * [addStrings description]
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
// error 使用 Number 转换在位数过大时会有误差
var addStrings = function(num1, num2) {
  return (Number(num1) + Number(num2)).toString();
};

// correct
// 这个逻辑是最基本的加法，将每一位各自相加，如果有进位则继续向前加
var addStrings = function(num1, num2) {
  let [i, j] = [num1.length, num2.length];
  let ans = '';
  let add = 0;

  i -= 1;
  j -= 1;
  // 将字符串拆分成一位一位
  for ( ; i >= 0 || j >= 0; i--, j--) {
    let a = i >= 0 ? +num1[i] : 0;
    let b = j >= 0 ? +num2[j] : 0;
    let sum = a + b + add;
    // 将每一位添加，十位，百位，千位等，用字符串拼接的方式相加
    ans = sum % 10 + ans;
    // 总数除以10之后取整，检查是否有进位
    add = ~~(sum / 10);
  }

  // 如果最后一位还有进位的话
  add && (ans = add + ans);
  return ans;
};

/****** 414. Third Maximum Number ******/
/**
 * [thirdMax 时间复杂度需要在O(n)内, 即一次遍历内]
 * @param {number[]} nums
 * @return {number}
 */
// error 有重复的元素的情况则是错的
var thirdMax = function(nums) {
  nums.sort(function(a, b) {return b - a;});
  return nums[2] || nums[0];
};

// error
var thirdMax = function(nums) {
  if (nums.length < 3) {
    return Math.max.apply(null, nums);
  }

  var max = Math.max.apply(null, nums),
    sec = 0,
    res = [];

  for (var i = 1; i < nums.length; i++) {
    if (nums[i] < max && nums[i] > sec) {
      res.push(sec);
      sec = nums[i];
    }
  }
  return res.length ? Math.max.apply(null, res) : max;
};

// correct
// 思路比较清晰，主要是能不能想到
// 遍历时保存三个最大值的数组
var thirdMax = function(nums) {
  let ans = [];

  nums.forEach(function(item) {
    let len = ans.length;
    // 保存初始值
    if (len === 0) {
      ans.push(item);
    } else if (len === 1) {
      // 在栈尾保存比原数组内的值大的值
      if (item > ans[0]) {
        ans.push(item);
      // 在栈首保存较小的值
      } else if (item < ans[0]) {
        ans.unshift(item);
      }
    } else if (len === 2) {
      if (item < ans[0]) {
        ans.unshift(item);
      } else if (item > ans[0] && item < ans[1]) {
        // 如果大小在正中则保存在中间
        ans.splice(1, 0, item);
      } else if (item > ans[1]) {
        ans.push(item);
      }
    } else if (len === 3) {
      // 如果有比最小值大的值则移除原最小值
      if (item > ans[0] && item !== ans[1] && item !== ans[2]) {
        ans.shift();
        if (item < ans[0]) {
          ans.unshift(item);
        } else if (item > ans[0]  && item < ans[1]) {
          ans.splice(1, 0, item);
        } else if (item > ans[1]) {
          ans.push(item);
        }
      }
    }
  });

  // 是否存在依次递增的长度为三的数组，否则是取最大值
  return ans.length === 3 ? ans[0] : ans.pop();
};

/****** 412. Fizz Buzz ******/
/**
 * [fizzBuzz description]
 * @param {number} n
 * @return {string[]}
 */
var fizzBuzz = function(n) {
  var res = [];
  for (var i = 1; i <= n; i++) {
    var item = i.toString();
    if (item % 3 === 0 && item % 5 === 0) {
      item = 'FizzBuzz';
    } else if (item % 3 === 0) {
      item = 'Fizz';
    } else if (item % 5 === 0) {
      item = 'Buzz';
    }
    res.push(item);
  }
  return res;
};

/*
  var fizzBuzz = function(n) {
    let ans = [];
    for (let i = 1; i <= n; i++) {
      let str = '';
      if (i % 3 === 0) {
        str += 'Fizz';
      }
      if (i % 5 === 0) {
        str += 'Buzz';
      }
      if (str === '') {
        str += i;
      }
      ans.push(i);
    }
    return ans;
  };
*/

/****** 409. Longest Palindrome ******/
/**
 * [longestPalindrome description]
 * @param {string} s
 * @return {number}
 */
// error
var longestPalindrome = function(s) {
  var obj = {};
  var arr = s.split('');
  var len = 0;
  var odd = false;
  arr.forEach(function(item) {
    if (!obj[item]) {
      obj[item] = 1;
    } else {
      obj[item] += 1;
    }
  });
  for (var item in obj) {
    if (obj[item] === 1) {
      odd = true;
    } else {
      // 除了判断是否有单个情况外，还需要判断奇数的情况
      len += obj[item];
    }
  }
  return (len % 2 === 0 && odd) ? ++len : len;
};

// correct
var longestPalindrome = function(s) {
  var obj = {};
  var arr = s.split('');
  var len = 0;
  var odd = false;
  arr.forEach(function(item) {
    if (!obj[item]) {
      obj[item] = 1;
    } else {
      obj[item] += 1;
    }
  });
  for (var item in obj) {
    // 重点是需要判断奇数的情况
    len += (obj[item] & 1) ? obj[item] - 1 : obj[item];
    (obj[item] & 1) && (odd = true);
  }
  return len + odd;
};

// correct
var longestPalindrome = function(s) {
  let hash = {};

  for (let item of s)
    hash[item] = ~~hash[item] + 1;

  let exsitsOld = false;
  let ans = 0;
  for (let key in hash) {
    let cnt = hash[key];
    // 按位与 这是重点，当且仅当前一个数为奇数时(即 cnt 为奇数时)，才输出1(即默认 true)
    ans += cnt & 1 ? cnt - 1 : cnt;
    (cnt & 1) && (exsitsOld = true);
  }

  return ans + exsitsOld;
};

/* tips
  按位与是将两个数转化成2进制，并且以32位整数表示
  当且仅当同一位上的数都为1时，输出1
  这里第二位的末位为1，其余位都是0，而所有偶数转化成2进制时末位都是0
  所以用该方法返回的值来判断前一个值的奇偶
  123 & 1 => 1111011 0000001 => 1
  12 & 1 => 1100 0001 => 0
 */

/****** 405. Convert a Number to Hexadecimal ******/
/**
 * @param {number} num
 * @return {string}
 */
// correct 但算法复杂度太高……忧伤
var toHex = function(num) {
  // 正整数直接调用 api
  if (num >= 0) {
    return num.toString(16);
  }
  var str = '';
  // 映射表
  var obj = {
    a: 10,
    b: 11,
    c: 12,
    d: 13,
    e: 14,
    f: 15,
    10: 'a',
    11: 'b',
    12: 'c',
    13: 'd',
    14: 'e',
    15: 'f'
  };
  var n = (Math.abs(num)).toString(16);
  // 是否进位
  var isHex = false;
  // 八位整数
  if (n.length < 8) {
    for (var i = 1, len = (8 - n.length); i <= len; i++) {
      n = '0' + n;
    }
  }
  // 补位
  for (var j = 0; j < n.length; j++) {
    var v = n[j];
    var item = (v < 10) ? (15 - v) : (15 - obj[v]);
    (j === n.length -1) && (item++);
    (j === n.length -1) && (item === 16) && (isHex = true ) && (item = 0);
    str += (item < 10) ? item : obj[item];
  }
  // 进位
  for (var k = n.length - 2; k >= 0; k--) {
    if (!isHex) break;
    // 是否要进位，是否是用字母表示
    var temp = (str[k] === 'f') ? 0 : (str[k] < 10) ? ++str[k] : obj[str[k]];
    temp = temp >= 10 ? obj[++temp] : temp;
    temp && (isHex = false);
    // 进位后重新拼接
    str = str.slice(0, k) + temp + str.slice(k+1);
  }

  return str;
};

/* 待理解
  var toHex = function(num) {
    if (num > 0) {
      return help(num);
    } else if (num === 0) {
      return '0';
    } else {
      num = -num;
      // 待理解
      return help(0xffffffff - num + 1);
    }

    function help(num) {
      let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
      let ans = '';

      // 不断除以16
      while (num) {
        let mod = num % 16;
        ans = arr[mod] + ans;
        num = ~~(num / 16);
      }

      return ans;
    }
  }
*/

/****** 404. Sum of Left Leaves ******/
// lack

/****** 401. Binary Watch ******/
// lack

/****** 400. Nth Digit   ******/
// lack

/****** 389. Find the Difference ******/
/**
 * [findTheDifference description]
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
// error 因为字母出现次数不唯一，所以错误
var findTheDifference = function(s, t) {
  var obj = {};
  for (var i = 0; i < s.length; i++) {
    obj[s[i]] = ~~obj[s[i]] + 1;
  }

  for (var j = 0; j < t.length; j++) {
    if (!obj[t[j]]){ return t[j]; }
  }
};

// error 因为是无序的，所以错误
var findTheDifference = function(s, t) {
  for (var j = 0; j < t.length; j++) {
    if (s.indexOf(t[j])) {return t[j];}
    s = s.substr(1);
  }
};

// correct 但算法复杂度较高
var findTheDifference = function(s, t) {
  var obj = {};
  var obj2 = {};
  for (var i = 0; i < s.length; i++) {
    obj[s[i]] = ~~obj[s[i]] + 1;
  }

  for (var j = 0; j < t.length; j++) {
    obj2[t[j]] = ~~obj2[t[j]] + 1;
  }

  for (var key in obj2) {
    if (obj2[key] === (~~obj[key]) + 1) {
      return key;
    }
  }
};

// correct 推荐答案也较复杂，运行较长
var findTheDifference = function(s, t) {
  var arr = s.split('').sort();
  var arr2 = t.split('').sort();

  for (var i = 0; i < arr2.length; i++) {
    if (arr2[i] !== arr[i]) { return arr2[i]; }
  }
};

// correct 较优解
// 按位异或
// 0 0 => 0
// 0 1 => 1
// 0 1 => 1
// 1 1 => 0
// 待理解
var findTheDifference = function(s, t) {
  var n = 0;
  for (var i = 0; i < s.length; i++) {
    n ^= s.charCodeAt(i);
  }
  for (var j = 0; j < t.length; j++) {
    n ^= t.charCodeAt(j);
  }
  return String.fromCharCode(n);
};

/****** 387. First Unique Character in a String ******/
/**
 * [firstUniqChar description]
 * @param {string} s
 * @return {number}
 */
// error 不推荐在 for 循环里调用函数
var firstUniqChar = function(s) {
  var arr = [];
  for (var i = 0; i < s.length; i++) {
    var key = s[i];
    var isIn = false;
    arr = arr.map(function(o) {
      if (o && o.value === key) {
        isIn = true;
        o.sum = ~~o.sum + 1;
      }
      return o; // 必须要 return
    });
    if (!isIn) {
      arr.push({
        value: key,
        sum: 1,
        index: i
      });
    }
  }

  // 字母总数从小到大排序，这一步多余了
  arr.sort(function(a, b) { return a.sum - b.sum; });

  // 如果最小值不是唯一
  if (arr[0].sum !== 1) { return -1; }

  // 对所有结果为一的排序
  var res = arr.filter(function(item) {
    return item.sum === 1;
  });
  res.sort(function(a, b) { return a.index - b.index; });
  return res[0].index;
};

// correct
var firstUniqChar = function(s) {
  var arr = [];
  for (var i = 0; i < s.length; i++) {
    var key = s[i];
    var n = -1;
    for (var j = 0, len = arr.length; j < len; j++) {
      if (arr[j] && arr[j].value === key) {
        arr[j].isUnique = false;
        n = j;
      }
    }
    if (n === -1) {
      arr.push({
        value: key,
        index: i,
        isUnique: true
      });
    }
  }

  var res = arr.filter(function(item) {
    return item.isUnique;
  });

  if (!res.length) { return -1; }

  res.sort(function(a, b) { return a.index - b.index; });
  return res[0].index;
};

// correct 官方解，方便好多……
var firstUniqChar = function(s) {
  for (var i = 0; i < s.length; i++) {
    var item = s[i];
    if (s.lastIndexOf(item) === s.indexOf(item)) {
      return i;
    }
  }

  return -1;
};

/****** 383. Ransom Note ******/
/**
 * [canConstruct 第二个字符串里的字符可以组成第一个字符串]
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
// error 并不是有序的，所以这里错了
var canConstruct = function(ransomNote, magazine) {
  var num = 0;
  for (var i = 0; i < ransomNote.length; i++) {
    var s = ransomNote[i];
    var m = magazine.substr(num);
    var index = m.indexOf(s);
    if (index === -1) return false;
    num = index + 1;

  }
  return true;
};

// correct 运算速率较快，击败了三分之二的选手
var canConstruct = function(ransomNote, magazine) {
  var obj = {};
  var mobj = {};
  for (var i = 0; i < ransomNote.length; i++) {
    var key = ransomNote[i];
    obj[key] = ~~obj[key] + 1;
  }
  for (var j = 0; j < magazine.length; j++) {
    var props = magazine[j];
    mobj[props] = ~~mobj[props] + 1;
  }
  for (var p in obj) {
    // 2 > undifined => false, 所以这里要取整
    mobj[p] = ~~mobj[p];
    if (obj[p] > mobj[p]) {
      return false;
    }
  }
  return true;
};

/*
  var canConstruct = function(ransomNote, magazine) {
    var hash = {};

    for (var i = 0; i < ransomNote.length; i++) {
      var item = ransomNote[i];

      for (var j = 0, len = magazine.length; j < len; j++) {
        // 循环直到找到当前字符串
        if (hash[j] || magazine[j] !== item) {
          continue;
        }
        hash[j] = true;
        break;
      }

      // 假如没有找到当前字符
      if (j === len) {
        return false;
      }
    }

    return true;
  }
*/

/****** 371. Sum of Two Integers ******/
// lack

/****** 367. Valid Perfect Square ******/
/**
 * [isPerfectSquare description]
 * @param {number} num
 * @return {boolean}
 */
// error timeout
var isPerfectSquare = function(num) {
  for (var i = 0; i <= num; i++) {
    if (i * i === num) {
      return true;
    }
  }
  return false;
};

// error timeout
var isPerfectSquare = function(num) {
  if (num === 1 || num === 4) { return true; }
  for (var i = 0, half = ~~(num/2); i <= half; i++) {
    if (i * i === num) {
      return true;
    }
  }
  return false;
};

/* correct
  二分法的思路
  var isPerfectSquare = function(num) {
    var a = 0;
    var b = num;

    while (a <= b) {
      var mid = (a + b) >> 1;
      var ans = mid * mid;

      if (ans > num) {
        b = mid - 1;
      } else if (ans < num) {
        a = mid + 1;
      } else {
        return true;
      }
    }

    return false;
  }
 */

/****** 349. Intersection of Two Arrays II ******/
/**
 * [intersection description]
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
// correct 算法复杂度很高 Your runtime beats 2 % of javascript submissions.
var intersection = function(nums1, nums2) {
  var arr = [];
  var arr1 = (nums1.length > nums2.length) ? nums1 : nums2;
  var arr2 = (arr1 === nums1)? nums2 : nums1;
  var num = -1;
  arr1.forEach(function(item) {
    arr2.forEach(function(value, index) {
      if (value === item) {
        num = index;
        arr.push(value);
      }
    });
    if (num !== -1) {
      arr2.splice(num, 1);
      num = -1;
    }
  });

  var res = arr.filter(function(value, index) {
    return arr.indexOf(value) === index;
    // 注意这里不是 lastIndexOf
    // return arr.indexOf(value) === arr.lastIndexOf(value);
  });

  return res;
};

/****** 350. Intersection of Two Arrays II ******/
/**
 * [intersect description]
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
// correct Your runtime beats 92.13 % of javascript submissions.
var intersect = function (nums1, nums2) {
  var obj = {};
  var res = [];
  var arr = (nums1.length > nums2.length)? nums1 : nums2;
  var arr2 = (arr === nums1)? nums2 : nums1;
  for (var i = 0; i < arr.length; i++) {
    var key = arr[i];
    obj[key] = ~~obj[key] + 1;
  }
  for (var j = 0; j < arr2.length; j++) {
    var props = arr2[j];
    if (obj[props]) {
      res.push(props);
      obj[props] = obj[props] - 1;
    }
  }

  return res;
};

/****** 345. Reverse Vowels of a String ******/
/**
 * [reverseVowels description]
 * @param {string} s
 * @return {string}
 */
// error 字母表不全，未包括大写，算法对长度小的字符串不生效
var reverseVowels = function(s) {
  // 元音字母表
  var obj = {
    a: 1,
    e: 1,
    i: 1,
    o: 1,
    u: 1
  };
  var num = 0;
  for (var n = 0; n < s.length; n++) {
    if (obj[s[n]]) {num++;}
  }
  if (num <= 1) {
    return s;
  }
  var half = ~~(s.length/2);
  var startHalf = [];
  var endHalf = [];
  var res = s.split('');
  var len = (res.length % 2 === 0) ? (half + 1) : (half + 2);
  // 保存需要替换的元音
  for (var i = 0; i <= half; i++) {
    var key = s[i];
    obj[key] && startHalf.push(key);
  }
  // 替换后半部分元音
  for (var j = s.length - 1; j >= len; j--) {
    var p = s[j];
    if (obj[p]) {
      var v = startHalf.shift();
      endHalf.unshift(p);
      res.splice(j, 1, v);
    }
  }
  // 替换前半部分元音
  for (var k = 0; k <= half; k++) {
    var props = s[k];
    if (obj[props]) {
      var w = endHalf.pop();
      res.splice(k, 1, w);
    }
  }

  return res.join('');
};

// correct
var reverseVowels = function(s) {
  // 元音字母表
  var vowelsStr = 'aeiouAEIOU';
  var arr = s.split('');
  var vowelsArr = [];
  var str = '';
  var index = 0;

  for (var i = 0; i < s.length; i++) {
    if (vowelsStr.indexOf(s[i]) !== -1) {
      vowelsArr.push(s[i]);
    }
  }
  // 元音顺序倒序
  vowelsArr.reverse();
  // 字符串相加，是元音则添加元音，否则添加原有字符
  for (var j = 0; j < arr.length; j++) {
    if (vowelsStr.indexOf(arr[j]) === -1) {
      str += arr[j];
    } else {
      // 这里的 index++ 使得数组也推进了
      str += vowelsArr[index++];
    }
  }
  return str;
};

/****** 344. Reverse String ******/
/**
 * [reverseString description]
 * @param {string} s
 * @return {string}
 */
// correct 最好再判断为 null 的情况
var reverseString = function(s) {
  var arr = s.split('');
  return arr.reverse().join('');
};

/****** 342. Power of Four ******/
/**
 * @param {number} num
 * @return {boolean}
 */
// error
var isPowerOfFour = function(num) {
  if (!num) { return false; }
  if (num === 1 || num === 4) { return true; }
  var n = Math.sqrt(num);
  if ((n % 4) !== 0) { return false; }
  return true;
};

// error
var isPowerOfFour = function(num) {
  var base = 4;
  var log = Math.log(num) / Math.log(base);
  return log.toString().indexOf('.') === -1;
};

// correct 运算速度不是最快的，较为简便，不使用循环或递归的方式
var isPowerOfFour = function (num) {
  // 对 0 无效
  if (!num) { return false; }
  // 首先获取以 x 为底 y 的对数(即 logx y)
  var a = Math.log(num) / Math.log(4);
  // 再使用结果去乘幂，检验结果是否匹配
  // 但这里为什么要取整？
  return Math.pow(4, Math.floor(a)) === num || Math.pow(4, Math.ceil(a)) === num;
};

// correct 思路清晰，运算较快
var isPowerOfFour = function (num) {
  if (num === 1) {
    return true;
  } else if (num === 0) {
    return false;
  } else {
    // 不断相除
    while (num % 4 === 0) {
      num = num / 4;
      if (num === 1) {
        return true;
      }
    }
    return false;
  }
};

// correct 开拓思路，转化成 2 进制再使用正则匹配
var isPowerOfFour = function(num) {
  return /^1(00)*$/.test(num.toString(2));
};
