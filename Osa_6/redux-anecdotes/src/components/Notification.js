import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification.message

  const style = {
    textAlign: "center",
    border: "solid",
    padding: 10,
    margin: 10,
    borderWidth: 1,
  }

  return notification && <div style={style}>{notification}</div>
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification
