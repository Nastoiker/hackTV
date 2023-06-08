// export interface IRegister {
//   login: string
//   email: string
//   phone: number
//   password: string
//   country: string
//   gender: string
//   years: number
// }
export interface IRegister {
  login: string
  email: string
  // phone: number
  hashpassword: string;
  // country: string
  // gender: string
  confirm_password: string;
  phone: string;
  role: string;
  authorUrl: string;
}
