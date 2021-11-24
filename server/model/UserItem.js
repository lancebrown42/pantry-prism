
module.exports=(sequelize,DataTypes)=>{

const UserItem =  sequelize.define('UserItem',{
  intUserInventoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
  },
// Model attributes are defined here
  intUserId:{
      type: DataTypes.INTEGER,
      allowNull: false,
  },
  intInventoryId:{
      type: DataTypes.INTEGER,
      allowNull: false,
  },

}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'TUserInventories',
    initialAutoIncrement: 1});
}