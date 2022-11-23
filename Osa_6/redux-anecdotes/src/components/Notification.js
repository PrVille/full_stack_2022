import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector((state) => {
    return state.notification.message
  })

  const style = {
    textAlign: "center",
    border: "solid",
    padding: 10,
    margin: 10,
    borderWidth: 1,
  }

  return notification && <div style={style}>{notification}</div>
}

export default Notification
