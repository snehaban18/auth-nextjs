export interface UserLogin {
    id: String,
    username: String,
    password: String
};

export interface UserSignup {
    email: String,
    username: String,
    password: String
};

export enum EMAIL_TYPES {
    VERIFY_EMAIL,
    RESET_PASSWORD
}