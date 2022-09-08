export interface Login {
    email:      string,
    password:   string
}
export const loginModel:Login = {
    email:      '',
    password:   ''
}

export interface SignUp{
    email:          string,
    password:       string,
    checkPassword:  string
}
export const signUpModel:SignUp = {
    email:          '',
    password:       '',
    checkPassword:  ''
}