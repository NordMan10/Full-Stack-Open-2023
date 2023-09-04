import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StatisticLine = (props) => {
  const {text, value, unit} = props

  return (
    <tr>
      <td>{text}:</td> 
      <td>{value} {unit}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const {good, neutral, bad, total} = props
  return (
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text='Good' value={good} />
          <StatisticLine text='Neutral' value={neutral} />
          <StatisticLine text='Bad' value={bad} />
          <StatisticLine text='Total' value={total} />
          <StatisticLine text='Average' value={(good - bad)/total} />
          <StatisticLine text='Positive' value={good/total * 100} unit='%'/>
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  return (
    <>
      <h2>Give feedback</h2>
      <Button handleClick={() => {
        setGood(good + 1)
        setTotal(total + 1)
      }} text='Good' />
      <Button handleClick={() => {
        setNeutral(neutral + 1)
        setTotal(total + 1)
      }} text='Neutral' />
      <Button handleClick={() => {
        setBad(bad + 1)
        setTotal(total + 1)
      }} text='Bad' />
      {total > 0 && <Statistics good={good} neutral={neutral} bad={bad} total={total}/>}
      {total === 0 && <h3>No feedback given</h3>}
    </>
  )
}


export default App
