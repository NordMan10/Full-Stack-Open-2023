const Notification = ({ notificationState }) => {
  if (notificationState.message === null) {
    return null
  }

  const styles = {
    color: notificationState.color,
    background: 'lightgrey',
    fontSize: 20 + 'px',
    borderStyle: 'solid',
    borderRadius: 5 + 'px',
    padding: 10 + 'px',
    marginBottom: 10 + 'px'
  }

  return (
    <div className="error" style={styles}>
      {notificationState.message}
    </div>
  )
}

export default Notification