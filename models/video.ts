import { Model } from "sequelize";

/**文章表 */
export default (sequelize: any, DataTypes: any) => {
  class Video extends Model {
    static associate(models: any) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "userId",
        as: "userInfo", // 定义User模型别名,在Song成生成userInfo节点
      });
    }
  }
  Video.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      coverPictureUrl: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      videoUrl: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      title: {
        type: DataTypes.STRING(64),
        defaultValue: "",
      },
      intro: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      commentCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      thumbUpCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      readCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      shareCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      contentSeconds: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Video",
      freezeTableName: true, // 强制表名称等于模型名称不然会自动复数化
      timestamps: false, // 一旦启用时间戳， 将会自动带入查询createdAt， updatedAt
    }
  );
  return Video;
};
