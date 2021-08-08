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

// weather section

const API_KEY = '9bee881f36b5e75d8b3d7700ad191ead';

function getWeather(position) {
  const weather = document.querySelector('.todo__weather');
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const userURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  fetch(userURL)
    .then((response) => response.json())
    .then((data) => {
      const weatherMain = document.querySelector('.weather-main');
      const temp = document.querySelector('.temp');
      weatherMain.textContent = data.weather[0].main.toUpperCase();
      temp.textContent = `${data.main.temp}°C`;

      const weatherIcon = document.createElement('img');
      const iconImg = data.weather[0].icon;
      weatherIcon.setAttribute('class', 'weather-icon');
      weatherIcon.src = `http://openweathermap.org/img/wn/${iconImg}@2x.png`;
      weather.prepend(weatherIcon);
    });
}

function getWeatherError() {
  alert('Unable to load weather');
}

navigator.geolocation.getCurrentPosition(getWeather, getWeatherError);

// to do list
const toDoItems = document.querySelector('.todo__items');
const toDoInput = document.querySelector('.todo__input');
const inputBtn = document.querySelector('.todo__submit');

function onAddToDoList(event) {
  event.preventDefault();
  const text = toDoInput.value;
  if (text === '') {
    toDoInput.focus();
    return;
  }
  const toDoItem = createToDo(text);
  toDoItems.appendChild(toDoItem);
	toDoInput.value = '';
	toDoInput.focus();
}

function createToDo(text) {
  const item = document.createElement('li');
  item.setAttribute('class', 'todo__item');

  const itemName = document.createElement('span');
  itemName.textContent = text;

  const btnWrap = document.createElement('span');

  const checkBtn = document.createElement('button');
  checkBtn.setAttribute('class', 'buttons');
  checkBtn.innerHTML = `<i class="fas fa-check"></i>`;
  checkBtn.addEventListener('click', () => {
    itemName.classList.add('checked');
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('class', 'buttons');
  deleteBtn.innerHTML = `<i class="fas fa-trash-alt"></i>`;
	deleteBtn.addEventListener('click', () => {
		toDoItems.removeChild(item)
	})

  btnWrap.appendChild(checkBtn);
  btnWrap.appendChild(deleteBtn);
  item.appendChild(itemName);
  item.appendChild(btnWrap);

  return item;
}

inputBtn.addEventListener('click', onAddToDoList);
