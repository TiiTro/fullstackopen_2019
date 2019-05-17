import React from 'react';
import ReactDOM from 'react-dom';

const Part = (props) => {
    return(
        <div>
            <p>{props.part} {props.exercises}</p>
        </div>
    )
}

const Header = (props) => (
    <>
        <h1>{props.course}</h1>
    </>
)

const Content = (props) => (
    <>
        <Part part={props.part1} exercises={props.exercises1}/>
        <Part part={props.part2} exercises={props.exercises2}/>
        <Part part={props.part3} exercises={props.exercises3}/>
    </>
)

const Total = (props) => (
    <>
        <p>{props.totalExercises}</p>
    </>
)

const App = () => {
    const course = 'Half Stack -sovelluskehitys'
    const part1 = 'Reactin perusteet'
    const exercises1 = 10
    const part2 = 'Tiedonvälitys propseilla'
    const exercises2 = 7
    const part3 = 'Komponenttien tila'
    const exercises3 = 14

    return(
        <div>
            <Header course={course} />
            <Content 
                part1={part1}
                part2={part2}
                part3={part3}
                exercises1={exercises1}
                exercises2={exercises2}
                exercises3={exercises3}/>
            <Total totalExercises={exercises1 + exercises2 + exercises3}/>
        </div>
    )
    
}

ReactDOM.render(<App />, document.getElementById('root'));
