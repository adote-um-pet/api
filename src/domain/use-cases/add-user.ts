import { IUserModel } from "../models/user";

export interface IAddUserModel {
  name: string
  email: string
  password: string
}

export interface IAddUser {
  add: (userModel: IAddUserModel) => Promise<IUserModel>
}