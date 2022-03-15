import { Model } from "sequelize";

/**文章表 */
export default (sequelize: any, DataTypes: any) => {
  class Article extends Model {
    static associate(models: any) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "userId",
        as: "userInfo", // 定义User模型别名,在Song成生成userInfo节点
      });
    }
  }
  Article.init(
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
      coverUrlList: {
        type: DataTypes.STRING,
        defaultValue: "",
        get() {
          const coverUrlListValue = this.getDataValue("coverUrlList");
          return coverUrlListValue.split(",") || [];
        },
      },
      title: {
        type: DataTypes.STRING(64),
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
    },
    {
      sequelize,
      modelName: "Article",
      freezeTableName: true, // 强制表名称等于模型名称不然会自动复数化
      timestamps: false, // 一旦启用时间戳， 将会自动带入查询createdAt， updatedAt
    }
  );
  return Article;
};
