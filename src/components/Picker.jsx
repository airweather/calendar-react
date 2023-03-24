import { useState } from "react";
import styled from "styled-components";

const Picker = () => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [date, setDate] = useState({
    year: new Date().getFullYear(), // 현재 연도
    month: new Date().getMonth() + 1, // 현재 월
    day: new Date().getDate(), // 현재 일
  });
  const [pickedDate, setPickedDate] = useState(null);
  const [monthDetails, setMonthDetails] = useState(
    getMonthDetails(date.year, date.month)
  );

  function getMonthDetails(year, month) {
    const firstDay = new Date(year, month - 1, 1).getDay(); // 입력받은 년도와 달의 1일의 요일을 구함
    const lastDate = new Date(year, month, 0).getDate(); // 입력받은 년도와 달의 마지막 날짜를 구함
    return { firstDay, lastDate }; // 구한 값을 객체로 반환
  }

  // console.log(monthDetails);

  const calendar = new Array(42).fill().map((_, i) =>
    i >= monthDetails.firstDay &&
    i - monthDetails.firstDay < monthDetails.lastDate
      ? {
          year: date.year,
          month: date.month,
          day: i - monthDetails.firstDay + 1,
        }
      : " "
  );

  // const calendar = new Array(42).fill().map((data, i) => {
  //   const { firstDay, lastDate } = monthDetails;
  //   if (i >= firstDay && i < lastDate) {
  //     return (data = {
  //       year: date.year,
  //       month: date.month,
  //       day: i - firstDay + 1,
  //     });
  //   } else {
  //     return (data = " ");
  //   }
  // });

  // 다음달로 이동하는 함수
  const handleNextMonth = () => {
    // 현재 날짜의 월을 가져옴
    const currentMonth = date.month;
    // 다음달의 날짜 객체 생성
    const nextMonth =
      currentMonth >= 12
        ? { year: date.year + 1, month: 1, day: 1 }
        : { year: date.year, month: currentMonth + 1, day: 1 };
    // state 업데이트
    setDate(nextMonth);
    setMonthDetails(getMonthDetails(date.year, date.month));
  };

  const handleLastMonth = () => {
    // 현재 날짜의 월을 가져옴
    const currentMonth = date.month;
    // 다음달의 날짜 객체 생성
    const lastMonth =
      currentMonth <= 1
        ? { year: date.year - 1, month: 12, day: 1 }
        : { year: date.year, month: currentMonth - 1, day: 1 };
    // state 업데이트
    setDate(lastMonth);
    setMonthDetails(getMonthDetails(date.year, date.month));
    console.log(
      "last month : ",
      lastMonth,
      "now date : ",
      date,
      "month detail : ",
      monthDetails
    );
  };

  const handleToday = () => {
    setDate({
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
    });
    setMonthDetails(getMonthDetails(date.year, date.month));
  };

  console.log(pickedDate);

  return (
    <>
      <div
        style={{
          width: "400px",
        }}
      >
        <h1>Picker</h1>
        <h3>Date Picker</h3>
        <h5>{`${date.year}. ${date.month}`}</h5>
        <button onClick={handleNextMonth}>+</button>
        <button onClick={handleLastMonth}>-</button>
        <button onClick={handleToday}>today</button>
        <button onClick={() => console.log("date : ", date, "/", monthDetails)}>
          check
        </button>
        <DatepickerContainer>
          {daysOfWeek.map((day) => (
            <div key={day}>{day}</div> // 각 요일을 리스트 아이템으로 렌더링
          ))}
        </DatepickerContainer>
        <DatepickerContainer>
          {calendar?.map((day, i) => (
            <DateBox
              key={i}
              onClick={(e) => {
                setPickedDate({
                  year: day.year,
                  month: day.month,
                  day: Number(e.target.textContent),
                });
              }}
            >
              {day.day}
            </DateBox> // 각 요일을 리스트 아이템으로 렌더링
          ))}
        </DatepickerContainer>

        <h3>Time Picker</h3>
      </div>
    </>
  );
};

const DatepickerContainer = styled.div`
  display: grid; /* 그리드 속성을 사용하여 요일을 가로로 배치 */
  grid-template-columns: repeat(
    7,
    1fr
  ); /* 7개의 열을 생성하고 각 열의 너비를 균등하게 설정 */
  justify-items: center; /* 그리드 컨테이너의 가로 중앙에 위치하도록 설정 */
  align-items: center; /* 그리드 컨테이너의 세로 중앙에 위치하도록 설정 */
`;

// 스타일드 컴포넌트 생성
const DateBox = styled.div`
  //border: 1px solid #ccc; // 테두리 스타일 지정
  //background-color: #555; // 배경색 지정
  &:hover {
    border: 1px solid #555; // 호버 시 테두리 스타일 지정
    background-color: #c1e4ea; // 호버 시 배경색 지정
    cursor: pointer;
  }
`;

export default Picker;
