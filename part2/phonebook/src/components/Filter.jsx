const Filter = ({newSearchReq, handleSearchReqChange}) => {
  return (
    <div>
      Search: <input style={{marginBottom: 15 + 'px'}} 
        value={newSearchReq} onChange={handleSearchReqChange} 
      />
    </div>
  )
}

export default Filter