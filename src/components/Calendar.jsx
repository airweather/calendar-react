import { useState } from "react";
// import styles from "../style/calendar.module.css";
import styled from "styled-components";
import db from "../data/calendar.json";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const weekend = (day) => {
  let backgroundColor;
  let color;

  switch (day) {
    case "Sun":
      backgroundColor = "orange";
      color = "#555";
      break;
    case "Sat":
      backgroundColor = "skyblue";
      break;
    default:
      backgroundColor = "#aaa";
      color = "#000";
  }

  return {
    textAlign: "center",
    height: "50px",
    backgroundColor,
    color,
  };
};

const Calendar = () => {
  const nowDate = new Date();
  const thisYear = nowDate.getFullYear();
  const thisMonth = nowDate.getMonth() + 1;
  const thisDate = nowDate.getDate();

  const [date, setDate] = useState(new Date());
  const [firstDayOfMonth, setFirstDayOfMonth] = useState(
    new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  );

  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const calendar = new Array(42).fill().map((element, i) => {
    const lastDayOfMonth = monthData();
    const date = i - firstDayOfMonth + 1;

    const returnArr = [
      {
        id: 0,
        date,
        month,
        year,
        today: false,
      },
    ];

    db.map((data) => {
      if (
        parseInt(data.year) === year &&
        parseInt(data.month) === month &&
        parseInt(data.date) === date
      ) {
        returnArr.push(data);
        console.log(returnArr);
      }
    });

    if (todayCheck(date)) returnArr[0].today = true;

    if (date > 0 && date <= lastDayOfMonth) return returnArr;

    return [];
  });

  function todayCheck(date) {
    if (year === thisYear && month === thisMonth && date === thisDate) {
      return true;
    }
    return false;
  }

  function monthData() {
    const month = date.getMonth() + 1;

    switch (month) {
      case 1:
        return 31;
      case 2: {
        if (!leapYearCheck()) return 28;
        if (leapYearCheck()) return 29;
      }
      case 3:
        return 31;
      case 4:
        return 30;
      case 5:
        return 31;
      case 6:
        return 30;
      case 7:
        return 31;
      case 8:
        return 31;
      case 9:
        return 30;
      case 10:
        return 31;
      case 11:
        return 30;
      case 12:
        return 31;
    }
  }

  function leapYearCheck() {
    const year = date.getFullYear();
    if (year % 4 === 0 && year % 100 !== 0) return true;
    if (year % 400 === 0) return true;
    else return false;
  }

  function toLastMonth() {
    const currentMonth = date.getMonth();
    setDate(new Date(date.setMonth(currentMonth - 1)));
    setFirstDayOfMonth(
      new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    );
  }

  function toNextMonth() {
    const currentMonth = date.getMonth();
    setDate(new Date(date.setMonth(currentMonth + 1)));
    setFirstDayOfMonth(
      new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    );
  }

  function toCurrentMonth() {
    setDate(new Date(thisYear, thisMonth - 1, thisDate));
    setFirstDayOfMonth(new Date(thisYear, thisMonth - 1, 1).getDay());
    console.log(date);
  }

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Calendar</h1>
      <div style={{ textAlign: "center" }}>
        <button onClick={toLastMonth}>-</button>
        <h2>{`${year}.${month}`}</h2>
        <button onClick={toNextMonth}>+</button>
        <button onClick={toCurrentMonth}>오늘</button>
      </div>
      <CalendarLayout>
        {DAYS.map((day, i) => {
          return (
            <div key={i} style={weekend(day)}>
              <b>{day}</b>
            </div>
          );
        })}
      </CalendarLayout>
      <CalenderDateContainer>
        {calendar.map((date, i) => {
          return (
            <div key={i} className="box" onClick={(e) => console.log(e.target)}>
              {/* <div>{date[0]}</div> */}
              {date.map((da, i) => {
                return (
                  <div
                    key={i}
                    className={"schedules" + (da.today ? " today" : "")}
                    onClick={() => {
                      console.log(`${da.title} :  ${da.content}`);
                      alert(da.content);
                    }}
                  >
                    {da.title ? da.title : da.date}
                  </div>
                );
              })}
            </div>
          );
        })}
      </CalenderDateContainer>
    </>
  );
};

const CalendarLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  // grid-template-rows: 40px;
  grid-gap: 1px;
`;

const CalenderDateContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  // grid-template-rows: 40px;
  grid-gap: 1px;

  // color: "green";
  // font-weight: "bold";

  .box {
    background-color: #ddd;
    height: 150px;

    .schedules {
      cursor: pointer;
      margin: 1px;
      background-color: #888;

      &.today {
        border-radius: 30px;
        background-color: #aa7799;
      }
    }

    .schedules:hover {
      background-color: pink;
    }
  }
`;

export default Calendar;
