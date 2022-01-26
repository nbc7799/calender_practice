const date = new Date();

const viewYear = date.getFullYear();
const viewMonth = date.getMonth();

document.querySelector(".year-month").textContent = `${viewYear}년 ${
  viewMonth + 1
}월`;

const prevTime = new Date(viewYear, viewMonth, 0);
const thisTime = new Date(viewYear, viewMonth + 1, 0);
const nextTime = new Date(viewYear, viewMonth + 2, 0);
// Date객체에 date부분에 0을 주면 마지막날의 date객체가 생성
console.log(prevTime);
console.log(thisTime);
console.log(nextTime);

const PrDate = prevTime.getDate();
const PrDay = prevTime.getDay();
// 이전달의 마지막 날짜와 요일가져옴
console.log(PrDate);
console.log(PrDay);

const TiDate = thisTime.getDate();
const TiDay = thisTime.getDay();
// 이번달의 마지막 날짜와 요일가져옴
console.log(TiDate);
console.log(TiDay);

const prevDates = [];
const thisDates = [...Array(TiDate + 1).keys()].slice(1);
const nextDates = [];
//지난달, 다음달 날짜는 확정아니기에 빈배열
// 이번달은 Array(n)쓰면 길이가 n인 배열 생성, 이때 모든 요소는 empty값이기에 0~ (n-1)까지의 값 얻음
// 스프레드연산자로 리터럴을 배열로 변환, 그리고 제일앞에 0을 없애기위해 +1해주고 slice(1)

// console.log([Array(TiDate + 1)]); // [Array(32)]

// console.log([...Array(TiDate + 1)]); // [undefined, undefined.....] 32개 출력해줌
// // spread연산자는 연결,복사도 가능하고 배열,문자열,객체 등 개별요소로도 분리가능

// console.log([Array(TiDate + 1)].keys()); // Array Iterator {} 출력
// console.log([...Array(TiDate + 1).keys()]); // [0,1,2,3,....]출력

if (PrDay !== 6) {
  for (let i = 0; i < PrDay + 1; i++) {
    prevDates.unshift(PrDate - i);
  }
}

for (let i = 1; i < 7 - TiDay; i++) {
  nextDates.push(i);
}

const dates = prevDates.concat(thisDates, nextDates);
// concat은 배열이나 값들을 기존배열에 합쳐서 새 배열을 반환함
console.log(dates); //[26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5]

dates.forEach((date, i) => {
  dates[i] = `<div class='date'>${date}</div>`;
  console.log(dates); // ["<div class='date'>26</div>", "<div class='date'>27</div>",,,,,,, 반복
});

document.querySelector(".dates").innerHTML = dates.join("");
//const elements = ['Fire', 'Air', 'Water'];
//console.log(elements.join(''));
// expected output: "FireAirWater"
