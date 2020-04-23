import React,{ Fragment } from 'react';

export const Header = () => {
  const days = ["M","T","W","T","F","S","S"];
  return (
    <Fragment>
      <thead className="info">
        <tr>{days.map((day, index) => <td key={index}>{day}</td>)}</tr>
      </thead>
    </Fragment>
  )
}

export const CalendarDays = ({ data, currentDate }) => {
  /* 
  In order to display the calendar is need it to generate a two dimentions array
  const data = [
    [1,2,3,4,5],
    [6,7,8,9,10,11,12],
    [13,14,15,16,17,18,19],
    [20,21,22,23,24,25,26],
    [27,28,29,30]
  ]; 
  */
  return (
    <Fragment>
      { data.map((num) => 
        <tr key={Math.random()}>
          {num.map(week => <td className={week === currentDate ? 'text-primary' : ''} key={Math.random()}>{week}</td>)}
        </tr>) }
    </Fragment>
  )
}

function App() {
  const year = new Date().getFullYear();
  const currentDate = new Date().getDate();
  const month = new Date().getMonth();
  const getFullDays = new Date(year, (month + 1), 0).getDate();
  const initialDay = new Date(`${month + 1} 1, ${year}`).getDay();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August', 
    'September',
    'October',
    'November',
    'December'
  ];
  const data = () => {
    const result = [];
    let count = 0;
    let grid = initialDay === 0 ? 6 : 5
    // Creating the Two Dimentions Array
    for(let i = 1; i <= grid * 7; i += 1 ) {
      if (i % 7 === 0) { result.push([]) }
    }
    // Assigning the values
    for(let f = 1; f <= getFullDays + (initialDay - 1); f += 1) {
      if (f < initialDay) { 
        result[count].push("") 
      } else {
        if (result[count].length < 7) {
          result[count].push(f - (initialDay -1))
        } else {
          count += 1
          result[count].push(f - (initialDay -1))
        }
      }
    }
    if (result[result.length -1].length < 7) {
      const num = Math.abs(result[result.length -1].length - 7);
      for(let z = 0; z <= num - 1; z += 1) {
        result[result.length -1].push("");
      }
    };
    return result;
  }

  return (
  <div className="container d-flex justify-content-center align-items-center w-100 h-100">
    <div className="stendig">
    <h2 className="year">{year}</h2><h2 className="month">{months[month]}</h2>
      <table>
        <Header />
        <tbody>
          <CalendarDays
            data={data()}
            currentDate={currentDate}
          />
        </tbody>
      </table>
    </div>
  </div>
  );
}

export default App;
