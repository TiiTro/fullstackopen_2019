import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

// const Statistics = (props) => {
//   return(
//     <div>
//       <p>{props.text} {props.count}</p>
//     </div>
//   ) 
// }

const Statistics = ({countGood, countNeutral, countBad}) => {
  console.log(countGood);
  console.log(countNeutral);
  console.log(countBad);

  return(
    <div>
      <p>good {countGood}</p>
      <p>neutral {countNeutral}</p>
      <p>bad {countBad}</p>
      <p>all {countGood + countNeutral + countBad}</p>        
    </div>
  ) 
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  console.log(good);
  console.log(neutral);
  console.log(bad);
  return (
    <div>
      <h1>Give feedback</h1>
      <Button text={'good'} onClick={() => setGood(good +1)}/>
      <Button text={'neutral'} onClick={() => setNeutral(neutral +1)}/>
      <Button text={'bad'} onClick={() => setBad(bad +1)}/>
      <h1>statistics</h1>
      <Statistics 
        countGood={good}
        countNeutral={neutral}
        countBad={bad}/>
       {/* <Statistics text={'good'} count={good}/>
       <Statistics text={'neutral'} count={neutral}/>
       <Statistics text={'bad'} count={bad}/> */}
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)