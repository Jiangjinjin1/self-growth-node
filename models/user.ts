import { Model } from "sequelize";

/**用户表 */
export default (sequelize: any, DataTypes: any) => {
  class User extends Model {
    // static associate(models) {
    // define association here
    // this.belongsTo(models.Vehicle, {
    //   foreignKey: "vehicleName",
    //   as: "defaultVehicle",
    // });
    // }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      coverPictureUrl: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      nickname: {
        type: DataTypes.STRING(40),
        defaultValue: "",
      },
      type: {
        type: DataTypes.ENUM("NORMAL_USER", "DQ_SINGER", "DQ_OFFICIAL_ACCOUNT"),
        defaultValue: "NORMAL_USER",
      },
      musicCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      musicPlayCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "User",
      freezeTableName: true, // 强制表名称等于模型名称不然会自动复数化
    }
  );
  return User;
};
