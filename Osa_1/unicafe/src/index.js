import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const Statistic = (props) => {
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = ({countGood, countNeutral, countBad, countAll}) => {

  const sum = countAll.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  const average = (sum/countAll.length).toFixed(1);

  const positiveFeedback = (countGood/countAll.length * 100).toFixed(1) + '%';

  if(countAll.length === 0) {
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return(
    <table>
      <tbody>
        <Statistic text='good' value={countGood}/>
        <Statistic text='neutral' value={countNeutral}/>
        <Statistic text='bad' value={countBad}/>
        <Statistic text='all' value={countAll.length}/>
        <Statistic text='average' value={average}/>
        <Statistic text='positive' value={positiveFeedback}/>
      </tbody>
    </table>
  ) 
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState([]);

  const handleGoodClick = () => {
    setAll(all.concat(1));
    setGood(good + 1);
  }

  const handleNeutralClick = () => {
    setAll(all.concat(0));
    setNeutral(neutral + 1);
  }

  const handleBadClick = () => {
    setAll(all.concat(-1));
    setBad(bad + 1);
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text={'good'} onClick={handleGoodClick}/>
      <Button text={'neutral'} onClick={handleNeutralClick}/>
      <Button text={'bad'} onClick={handleBadClick}/>
      <h1>statistics</h1>
      <Statistics 
        countGood={good}
        countNeutral={neutral}
        countBad={bad}
        countAll={all}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)