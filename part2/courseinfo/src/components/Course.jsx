const Header = (props) => {
  const { name } = props
  
  return (
    <h2>{name}</h2>
  )
}
  
const Part = (props) => {
  const { partName, exersCount } = props

  return (
    <p>
      {partName}: {exersCount}
    </p>
  )
}

const Content = (props) => {
  const { parts } = props
  return (
    <div>
      {parts.map(part => 
        <Part key={part.id} partName={part.name} exersCount={part.exercises} />
      )}
    </div>
  )
}

const Total = (props) => {
  const { parts } = props

  return (
    <h4>
      Total of {
        parts.map(part => part.exercises).
          reduce((acc, curValue) => acc + curValue)
      } exercises
    </h4>
  )
}

const Course = (props) => {  
  const { course } = props

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  )
}

export default Course