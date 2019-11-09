const getCurrentCredentials = () => {
  const credentials = {
    "access-token": localStorage.getItem("access-token"),
    "token-type": localStorage.getItem("token-type"),
    client: localStorage.getItem("client"),
    expiry: localStorage.getItem("expiry"),
    uid: localStorage.getItem("uid")
  }
  return credentials
}
export default getCurrentCredentials