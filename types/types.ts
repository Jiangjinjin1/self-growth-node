import { ModelAttributes } from "sequelize";

export interface IPlainObject {
  [key: string]: any;
}

export interface IPlainObjectModal {
  [key: string]: ModelAttributes | object;
}

export interface UserInfoType {
  page: number;
  pageSize: number;
  type: "NORMAL_USER" | "DQ_SINGER" | "DQ_OFFICIAL_ACCOUNT";
}
