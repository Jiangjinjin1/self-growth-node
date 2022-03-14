import { Model } from "sequelize";
/**歌曲表 */

export default (sequelize: any, DataTypes: any) => {
  class Song extends Model {}

  Song.init(
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
      songUrl: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      cnName: {
        type: DataTypes.STRING(64),
        defaultValue: "",
      },
      enName: {
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
      modelName: "Song",
      freezeTableName: true, // 强制表名称等于模型名称不然会自动复数化
      timestamps: false, // 一旦启用时间戳， 将会自动带入查询createdAt， updatedAt
    }
  );

  return Song;
};
