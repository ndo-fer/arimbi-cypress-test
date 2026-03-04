export interface User {
    noTelepon: string;
    password: string;
}

export interface UserFixture {
    validUser: User;
    userWithInvalidPassword: User;
    unregisteredUser: User;
    emptyUser: User;
}
