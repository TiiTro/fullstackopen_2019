import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ course }) => (
	<h1>{course}</h1>
)

const Total = ({ parts }) => {
	console.log(parts);

	const total = parts
		.map(e => e.exercises)
		.reduce((total, e) => {
			return total + e;
	}, 0);

	console.log(total);
  return <p>yhteensä {total} tehtävää</p>
}

const Part = (props) => {
	console.log(props);
	return(
		<div>
			<p>{props.name} {props.exercises}</p>
		</div>
 	)
}

const Content = ({ parts }) => {
	const rows = () => parts.map(part =>
		<Part
			key={part.id}
			name={part.name}
			exercises={part.exercises}
		/>
	)

	return(
		<div>
			{rows()}
  	</div>
	)
}

const Course = ({ course }) => (
	<div>
			<Header course={course.name} />
			<Content parts={course.parts}/>
			<Total parts={course.parts}/>
	</div>
)

const App = () => {
  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  } 

  return (
    <div>
			<Course course={course} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
