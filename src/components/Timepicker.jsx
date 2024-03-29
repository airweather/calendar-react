import { useState } from "react";
import styled from "styled-components";

const Timepicker = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  function handleHours(e) {
    setHours(e.target.value);
  }

  function handleMinutes(e) {
    setMinutes(e.target.value);
  }

  const date = new Date();

  const a = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    hours,
    minutes
  );
  console.log(a);

  return (
    <>
      <h3>Time Picker</h3>
      <TimepickerContainer>
        <div>
          <span>
            {hours > 12
              ? hours - 12 < 10
                ? "0" + (hours - 12)
                : hours - 12
              : hours < 10
              ? "0" + hours
              : hours}
            시
          </span>
          :<span>{minutes < 10 ? "0" + minutes : minutes}분</span>
          <span>{hours >= 12 ? "Pm" : "Am"}</span>
        </div>
        <div className="range-bar">
          <input
            type="range"
            name="hours"
            min={0}
            max={23}
            value={hours}
            onChange={handleHours}
          />
          <input
            type="range"
            name="minutes"
            min={0}
            max={55}
            step={5}
            value={minutes}
            onChange={handleMinutes}
          />
        </div>
      </TimepickerContainer>
    </>
  );
};

const TimepickerContainer = styled.div`
  display: flex;
  .range-bar {
    display: flex;
    flex-flow: column;
  }
  input[type="range"] {
    appearance: none;
    accent-color: #888;
    border-radius: 15px;
    border: 1px solid #000;
    height: 1px;
    margin: 5px;
  }
  input[type="range"]::-webkit-slider-thumb {
    cursor: pointer;
    appearance: none;
    width: 10px;
    height: 10px;
    border-radius: 3px;
    border: 1px solid #000;
    background-color: #fff;
  }
`;

export default Timepicker;
