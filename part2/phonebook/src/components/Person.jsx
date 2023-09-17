const Person = ({person, handleDelete}) => {
  return (
    <div >
      <p style={{margin: 0 + 'px',
                 display: 'inline'}}>
          {person.name}: {person.number}
      </p>
      <button style={{marginLeft: 5 + 'px'}} 
        onClick={handleDelete}>
          Delete
        </button>
    </div>
  )
}

export default Person