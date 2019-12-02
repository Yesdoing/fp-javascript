var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
for(let i = 0; i < array.length; i++) {
  array[i] = Math.pow(array[i], 2);
}

array;

// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(
//   function(num) {
//     return Math.pow(num, 2);
//   }
// );

// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map( num => Math.pow(num, 2));

// var counter = 0;
// function increment() {
//   return ++counter;
// }


// function showStudent(ssn) {
//   let student = db.find(ssn);
//   if(student !== null) {
//     document.querySelector(`${elementId}`).innerHTML = `${student.ssn}, ${student.firstname}, ${student.lastname}`;
//   } else {
//     throw new Error('학생을 찾을 수 없습니다!');
//   }
// }

// showStudent('444-44-4444');

var find = curry((db, id) => {
  let obj = db.find(id);
  if (obj === null) {
    throw new Error('객체를 찾을 수 없습니다!');
  }
  return obj;
})

var csv = student => `${student.ssn}, ${student.firstname}, ${student.lastname}`;

var append = curry((selector, info) => {
  document.querySelector(selector).innerHTML = info;
});

var sum = (total, current) => total + current;
var total = arr => arr.reduce(sum);
var size = arr => arr.length;
var divide = (a, b) => a / b;
var average = arr => divide(total(arr), size(arr));
average(input);

var sortDesc = arr => {
  arr.sort(
    (a,b) => b - a
  );
};

let enrollment = [
  {enrolled: 2, grade: 100},
  {enrolled: 2, grade: 80},
  {enrolled: 1, grade: 89},
];

// 명령형으로 짠 코드
var totalGrades = 0;
var totalStudentsFound = 0;
for(let i = 0; i < enrollment.length; i++) {
  let student = enrollment[i];
  if(student !== null) {
    if(student.enrolled > 1) {
      totalGrades += student.grade;
      totalStudentsFound++;
    }
  }
}

var average = totalGrades / totalStudentsFound;