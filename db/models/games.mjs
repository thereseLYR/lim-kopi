export default function initGamesModel(sequelize, DataTypes) {
  return sequelize.define(
    "user",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      game_state: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      underscored: true,
    }
  );
}