import {createSlice} from "@reduxjs/toolkit";
export const initialState = {
  login: '',
  email: '',
  phone: 0,
  password: '',
  country: '',
  gender: '',
  years: 0,
}
const Registration = createSlice({
  name: 'Registraton',
  initialState,
  reducers: {
    registerFetch: (state, action) => {

    }
  }
});
export default Registration.reducer;
