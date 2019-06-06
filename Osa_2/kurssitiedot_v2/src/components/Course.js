import React from 'react'

const Header = ({ course }) => (
	<h2>{course}</h2>
)

const Total = ({ parts }) => {
	// console.log(parts);

	const total = parts
		.map(e => e.exercises)
		.reduce((total, e) => {
			return total + e;
	}, 0);

	// console.log(total);
  return <p style={{fontWeight: 'bold'}}>yhteensä {total} tehtävää</p>
}

const Part = (props) => {
	// console.log(props);
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

const Course = ({ name, parts }) => {
//   console.log(name, parts);
  return(
    <div>
        <Header course={name} />
        <Content parts={parts}/>
        <Total parts={parts}/>
    </div>
  )
}

export default Course;