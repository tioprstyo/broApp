const user = {
  requestToken: '',
  phoneNumber: '',
  localization: '',
  token: '',
  exp: '',
  user: null,
  request: null,
  modalInfo: false,
  signUpPhone: '',
};

const data = {
  user,
};

const reducer = (state = data, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state, // not needed here, but I add this since your production state will likely have more than just one key
        user: action.input,
      };

    default:
      return state;
  }
};
export default reducer;
