let date = new Date();

const renderCalender = () => {
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

  // 이전달,다음달 날짜 투명하게 만들기
  const firstDateIndex = dates.indexOf(1);
  const lastDateIndex = dates.lastIndexOf(TiDate);

  dates.forEach((date, i) => {
    const condition =
      i >= firstDateIndex && i < lastDateIndex + 1 ? "this" : "other";
    dates[
      i
    ] = `<div class='date'><span class='${condition}'>${date}</span></div>`;
    console.log(dates); // ["<div class='date'>26</div>", "<div class='date'>27</div>",,,,,,, 반복
  });

  document.querySelector(".dates").innerHTML = dates.join("");
  //const elements = ['Fire', 'Air', 'Water'];
  //console.log(elements.join(''));
  // expected output: "FireAirWater"
  console.log(dates);

  // 1.  new Date()를 통해 오늘 날짜에 맞는 date객체를 새로 만들어주고,
  // 2. viewMonth와 viewYear가 today의 데이터와 같은지 비교를 한 다음
  // 3. 만약 2번이 충족된다면 this라는 클래스를 가진 태그들을 모두 찾아내서 반복문을 돌려줍니다.
  // 4. 그러고 나서 해당 태그가 가지고 있는 날짜는 문자열이기 때문에 + 단항 연산자를 통해 숫자로 변경한 뒤, 오늘 날짜와 비교하고
  // 5. 4번이 충족된다면 해당 태그에 today라는 클래스를 추가하고 break로 반복문을 종료해 주는 코드라고 볼 수 있습니다.
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

// 버튼누르면 전달, 이번달,다음달로 이동하게.

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
// 원본 date를 수정해야하기에 let으로 date 변경해줌
const goToday = () => {
  date = new Date();
  renderCalender();
};
