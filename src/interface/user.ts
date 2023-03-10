export interface LoginModel {
    email:    string;
    password: string;
}

export interface RegisterModel {
    email:       string;
    password:    string;
    name:        string;
    phoneNumber: string;
}
export interface SignInModel {
    id:          number;
    email:       string;
    avatar:      string;
    phoneNumber: string;
    name:        string;
    accessToken: string;
}
export interface AllUser {
    userId: number,
    name: string,
    avatar: string,
    email: string,
    phoneNumber:string
}