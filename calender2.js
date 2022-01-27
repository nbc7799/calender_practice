//------------Date 객체 생성
let date = new Date();

const renderCalender = () => {
  const viewYear = date.getFullYear();
  const viewMonth = date.getMonth();
  // 년도와 월은 자주사용해야하기때문에 메서드로 호출하는것보다 미리 변수로 만들어놓는것

  //------------ year-month 채우기
  document.querySelector(".year-month").textContent = `${viewYear}년 ${
    viewMonth + 1
  }월`;

  // 지난달 날짜들과 다음달 날짜들을 같이 표기하기위해서는
  // 지난달 마지막 날짜와 요일, 이번달 마지막 날짜와 요일 알아야함
  // 매월마다 처음날짜는 1이지만 마지막 날짜가 다르기때문
  // 그래서 지난달마지막 날짜로 지난달 날짜를 몇개 그려내야할지 알고
  // 이번달 마지막 날짜로 이번달날짜를 몇개 그려내야할지 알수있음

  //----------- 지난 달 마지막 Date, 이번 달 마지막 Date
  const lastTime = new Date(viewYear, viewMonth, 0);
  const thisTime = new Date(viewYear, viewMonth + 1, 0);
  const nextTime = new Date(viewYear, viewMonth + 2, 0);
  // Date객체에 date 부분에 0을 넣으면 마지막날 date 객체 생성
  // 이외의 숫자넣으면 해당되는 날짜가 불러와짐

  const prDate = lastTime.getDate();
  const prDay = lastTime.getDay();
  //이전달의 마지막 날짜와 요일 가져옴

  const thisDate = thisTime.getDate();
  const thisDay = thisTime.getDay();
  //이번달의 마지막 날짜와 요일 가져옴

  //------------Dates 기본 배열들
  const lastDates = [];
  const thisDates = [...Array(thisDate + 1).keys()].slice(1);
  const nextDates = [];
  //Array(n)하면 길이가 n인 배열 생성, spread연산자쓰면 Array(32)를 개별요소로 풀어줌
  //거기에 keys()메소드 쓰면 인덱스를 값으로 가지는 배열로만들어줌
  //slice로 0을 제거해줌

  //------------lastDates 계산
  //이제 얻은 1~31숫자를 빈배열에다가 넣어줌
  //토요일은 필요없으니 day가 6이아닌것에만 for문실행
  if (prDay !== 6) {
    for (let i = 0; i < prDay + 1; i++) {
      lastDates.unshift(prDate - i);
    }
  }

  //------------nextDates 계산
  // 이번달 마지막날로 다음달 몇일 채울지 계산, 다음달 날짜들이 나올수 있는 갯수는
  // 6개 한정인데, 이번달 마지막이 어디까지 오느냐에 따라 다음달이 나올수 있는 공간이 결정됨, 따라서 thisDay를 빼줌
  for (let i = 1; i < 7 - thisDay; i++) {
    nextDates.push(i);
  }

  //------------Dates 합치기
  const dates = lastDates.concat(thisDates, nextDates);
  //concat은 배열이나 값들을 기존배열에 합쳐서 새 배열 반환

  const firstDateIndex = dates.indexOf(1);
  const lastDateIndex = dates.lastIndexOf(thisDate);
  console.log(firstDateIndex);

  //------------Dates 그리기
  dates.forEach((date, i) => {
    const condition =
      i >= firstDateIndex && i < lastDateIndex + 1 ? "this" : "other";
    dates[
      i
    ] = `<div class='date'><span class=${condition}>${date}</span></div>`;
  });
  //dates 배열 돌면서 각 인덱스에 `<div class='date'>${date}</div>` 넣어줌

  document.querySelector(".dates").innerHTML = dates.join("");
  //왜 join('')안해주면 ''가 html에 표시되는지 모르겠음..

  //오늘 날짜에 동그라미
  const today = new Date();
  if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
    for (let date of document.querySelectorAll(".this")) {
      if (+date.innerText === today.getDate()) {
        date.classList.add("today");
        break;
      }
    }
  }
};
renderCalender();

//1. 지난달 다음달 오늘날짜로 돌아가는 기능 만들기
//2. 지난 달 부분과 다음 달 부분을 조금 투명하게 하기
//3. 오늘 날짜 표기하기
const prevMonth = () => {
  date.setDate(1);
  date.setMonth(date.getMonth() - 1);
  renderCalender();
};

const nextMonth = () => {
  date.setDate(1);
  date.setMonth(date.getMonth() + 1);
  renderCalender();
};

const goToday = () => {
  date = new Date();
  renderCalender();
};
