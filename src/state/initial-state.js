const initialState = {
  reduxTokenAuth: {
    currentUser: {
      isLoading: false,
      isSignedIn: false,
      attributes: {
        uid: "uid",
        name: "name",
        nickname: "nickname",
        city: "city",
        country: "country",
        email: "email",
        role: "role"
      },
    },
  },
}

export default initialState