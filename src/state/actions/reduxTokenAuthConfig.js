import { generateAuthActions } from "redux-token-auth"

const config = {
  authUrl: 'https://classy-news-backend.herokuapp.com/auth',
  userAttributes: {
    uid: "uid",
    name: "name",
    nickname: "nickname",
    city: "city",
    country: "country",
    email: "email",
    role: "role"
  },
  userRegistrationAttributes: {
    uid: "uid",
    name: "name",
    nickname: "nickname",
    city: "city",
    country: "country",
    email: "email",
    role: "role"
  }
}

const {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
} = generateAuthActions(config)

export { registerUser, signInUser, signOutUser, verifyCredentials }