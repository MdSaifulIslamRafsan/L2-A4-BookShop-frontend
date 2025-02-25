export type TUserRoles = "admin" |  "user"
export type TUser = {
    role: TUserRoles,
    email : string,
    iat : number,
    exp : number,
}
