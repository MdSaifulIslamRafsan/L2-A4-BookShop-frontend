export type TUserRoles = "admin" | "faculty" | "student"
export type TUser = {
    role: TUserRoles,
    email : string,
    iat : number,
    exp : number,
}
