import React from 'react'

const Course = ({ name, parts }) => {

	const Header = ({ course }) => (
		<h2>{course}</h2>
	)
	
	const Total = ({ parts }) => {
		const total = parts
			.map(e => e.exercises)
			.reduce((total, e) => {
				return total + e;
		}, 0);
	
		return <p style={{fontWeight: 'bold'}}>total of {total} exercises</p>
	}
	
	const Part = (props) => {
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
	
		return (
			<div>
				{rows()}
				</div>
		)
	}

  return (
    <div>
        <Header course={name} />
        <Content parts={parts}/>
        <Total parts={parts}/>
    </div>
  )
}

export default Course;