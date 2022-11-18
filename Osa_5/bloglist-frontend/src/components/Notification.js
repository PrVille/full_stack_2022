const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  if (notification.type === 'error') {
    return <div className="errMsg">{notification.message}</div>
  }

  if (notification.type === 'info') {
    return <div className="msg">{notification.message}</div>
  }
}

export default Notification
