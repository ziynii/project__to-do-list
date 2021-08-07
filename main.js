// date section
const toDoMonth = document.querySelector('.month');
const toDoDate = document.querySelector('.date');
const toDoDay = document.querySelector('.day');

const myDate = new Date();
const month = myDate.getMonth();
const date = myDate.getDate();
const day = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format();

const monthArr = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];

function getToday() {
  toDoMonth.textContent = monthArr[month];
  toDoDate.textContent = `${date < 10 ? '0' + date : date}`;
  toDoDay.textContent = day.toUpperCase();
}

getToday();


