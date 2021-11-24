
module.exports=(sequelize,DataTypes)=>{

const Item =  sequelize.define('Item',{
  intInventoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
  },
// Model attributes are defined here
strSku:{
    type: DataTypes.STRING,    
},
strDescription:{
    type: DataTypes.STRING,
},
qtyQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
},
strImage:{
    type: DataTypes.STRING,
}
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'TInventories',
    initialAutoIncrement: 1});
}