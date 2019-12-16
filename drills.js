// 1. Count sheep

//Input: 3

//Output:
// 3: Another sheep jumps over the fence
// 2: Another sheep jumps over the fence
// 1: Another sheep jumps over the fence
// All sheep jumped over the fence

//Input for each recursive call:
// countSheep(3)
// countSheep(2)
// countSheep(1)
// countSheep(0)

// Output for each recursive call:
// 3: Another sheep jumps over the fence
// 2: Another sheep jumps over the fence
// 1: Another sheep jumps over the fence
// All sheep jumped over the fence

const countSheep = function(numOfSheep) {
  if (numOfSheep === 0) {
    console.log("All sheep jumped over the fence");
  } else {
    console.log(`${numOfSheep}: Another sheep jumps over the fence`);
    countSheep(numOfSheep - 1);
  }
};

// countSheep(3);

// 2. Power Calculator

// input: 10, 4
// output: 10000
// recursive input:
// powerCalc(10, 4)
// powerCalc(10, 4-1)
// powerCalc(10, 3-1)
// powerCalc(10, 2-1)
// recursive output:
// return 10 * powerCalc(10, 3)
// return 10 * 10 * powerCalc(10*2)
// return 10 * 10 * 10 * powerCalc(10*1)
const powerCalculator = function(int, exp) {
  if (exp < 0) {
    return `Exponent should be greater than or equal to zero`;
  }
  if (exp === 1 || exp === 0) {
    return int;
  } else {
    return int * powerCalculator(int, exp - 1);
  }
};

// console.log(powerCalculator(10, 3));

// 3. Reverse String
// input: 'hello'
// output: 'olleh'
// recursive input + output:
// returns
// 'ello' + 'h'
// llo + 'e'
// lo + l
// o + l
// o
// unrolls, after acumulating o,l,l,e,h
// and returns inner to outer.
const reverseString = function(x) {
  if (x === "") {
    return "";
  }
  console.log(x.slice(1), x.charAt(0));
  return reverseString(x.slice(1)) + x.charAt(0); // Notice NOT BOTH are in the recursion call
};

// reverseString("Hello");
// console.log(reverseString("Hello"));

// 4.  Calculate Nth triangle
const tri = function(nth) {
  if (nth === 0) {
    return nth;
  } else {
    return nth + tri(nth - 1);
  }
};

// console.log(tri(6));

// 5. String Splitter: ***
//  Write a recursive function that splits a string based on a separator/delimitor (similar to String.prototype.split). Don't use JS array's split function to solve this problem.

// compare 1 by 1. Is the character a separator? If so, we remove it and return an empty string(no space) to add onto string
const splitter = function(string, separator) {
  if (string === "") {
    return "";
  }
  let char = string[0];
  console.log(char);
  if (char !== separator) {
    return char + splitter(string.slice(1), separator); // char + char + char + char ...
  } else {
    return "" + splitter(string.slice(1), separator);
  }
};

// console.log(splitter("recur/si/on", "/"));

// 6. Fibonacci ***
// Write a recursive function that prints the Fibonacci sequence of a given number. The Fibonacci sequence is a series of numbers in which each number is the sum of the 2 preceding numbers. For example, the 7th Fibonacci number in a Fibonacci sequence is 13. The sequence looks as follows: 1, 1, 2, 3, 5, 8, 13.

let fibonacci_series = function(n) {
  if (n === 1) {
    return [0, 1];
  } else {
    let series = fibonacci_series(n - 1); // This runs in the forward phase 'loop' before below. Runs num of times provided in arg.
    series.push(series[series.length - 1] + series[series.length - 2]); // taking 2 previous values and adding them
    return series;
  }
};
// Be careful: You need to pay attention to the bracket notation and what it yields from the array.
//

//  console.log('fibonacci series:', fibonacci_series(8));

// 7. Factorial
const factorial = function(num) {
  if (num <= 0) {
    return 1;
  } else {
    return num * factorial(num - 1);
  }
};
// console.log(factorial(5));

// 8. 2D Maze ***
let mySmallMaze = [
  [" ", " ", " "],
  [" ", "*", " "],
  [" ", " ", "e"]
];

let maze = [
  [" ", " ", " ", "*", " ", " ", " "],
  ["*", "*", " ", "*", " ", "*", " "],
  [" ", " ", " ", " ", " ", " ", " "],
  [" ", "*", "*", "*", "*", "*", " "],
  [" ", " ", " ", " ", " ", " ", "e"]
];

// Rember: maze[col][row] ie maze[1][0] = "*"
const findWayOut = function(
  maze,
  position = 0,
  row = 0,
  column = 0,
  path = [],
  direction = "S"
) {
  // The constraints. We cannot go beyond the borders.
  if (row >= maze.length || column >= maze[0].length) {
    return;
  }
  if (row < 0 || column < 0) {
    return;
  }
  // The pointer.
  path[position] = direction; // assigning index to direction
  position++;
  // Base case
  if (maze[row][column] === "e") {
    console.log("We found the path.", path);
    return;
  }
  if (maze[row][column] === " ") {
    maze[row][column] = "V";
    findWayOut(maze, position, row, column - 1, path, "L"); // accumulates its own path
    findWayOut(maze, position, row, column + 1, path, "R"); // accumulates its own path
    findWayOut(maze, position, row - 1, column, path, "U"); // accumulates its own path
    findWayOut(maze, position, row + 1, column, path, "D"); // accumulates its own path
    maze[row][column] = " ";
  }
  position--;
};

// Most important: We need to call these recursions like above so that each direction gets a chance and continues
// if the successive "room" it goes into is indeed "open". When it isn't, then that recursive call, in its deeper
// recursive call for the next direction is called and so on and so forth. This allows for each recursive call,
// to accumulate its own path, with the console.log() printing each one.
//

// findWayOut(mySmallMaze);

// first goes beyond bounds. Returns nothing. Recursive findWayOut() It tries out all 4 directions before moving on.
// If it doesn't break due to boundaries or *, then it keeps going with the recursive call.

// 9. Anagrams***

// Challenge? Basically rearrange letters till all combinations have printed out once. Thus, we're dealing with permutations.
// Take the first letter, and find all combinations in which chosen letter is first. Then move on to next letter. And repeat.
// How do we keep the first letter the same and rearrange the following sets of letters?

// How do we print out all combinations only once?

// What is our base case? What is the simplest problem to solve?

function findPerms(str) {
  if (str.length === 1) return [str];

  let all = [];
  for (let i = 0; i < str.length; i++) {
    const currentLetter = str[i];
    const remainingLetters = str.slice(0, i) + str.slice(i + 1); // ****
    // string.slice(0, 2) gets first letter of string

    // string.slice(2) this number represents number of letter subtracted from the front. 1 takes "s", 2 takes "st"
    // remember, the last recur function to run, is the first recur function to be unrolling. It still has stuff that needs to run
    // underneath the recursion
    const permsOfRemainingLetters = findPerms(remainingLetters);
    permsOfRemainingLetters.forEach(subPerm => {
      all.push(currentLetter + subPerm);
    });
  }
  return all;
}

console.log("permutations: ", findPerms("abc"));

const facebook = {
  Zuckerberg: {
    Schroepfer: {
      Bosworth: {
        Steve: {},
        Kyle: {},
        Andra: {}
      },
      Zhao: {
        Richie: {},
        Sofia: {}
      }
    },
    Schrage: {
      VanDyck: {
        Sabrina: {},
        Michelle: {},
        Josh: {}
      },
      Swain: {
        Blanch: {},
        Tom: {},
        Joe: {}
      }
    },
    Sandberg: {
      Goler: {
        Eddie: {},
        Julie: {},
        Annie: {}
      },
      Hernandez: {
        Rowi: {},
        Inga: {},
        Morgan: {}
      },
      Moissinac: {
        Amy: {},
        Chuck: {},
        Vinni: {}
      },
      Kelley: {
        Eric: {},
        Ana: {},
        Wes: {}
      }
    }
  }
};

const orgChart = function(obj, indent = "") {
  let output = "";
  for (let key in obj) {
    // let indent = '  ';
    output = output + indent + key + "\n"; // start/initialize at Zuckerburg with no indent. \n is break
    output = output + orgChart(obj[key], indent + "     "); // all the following
    // console.log("output2: ", output);
  }
  return output;
};

// orgChart(facebook);
// console.log(orgChart(facebook));
