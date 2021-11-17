module.exports=(sequelize,DataTypes)=>{

  const User =  sequelize.define('User', {
    intUserId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    // Model attributes are defined here
    strFirstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    strLastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    strAddress: {
      type: DataTypes.STRING,
    },
    dtmDateOfBirth:{
      type: DataTypes.DATE,
      allowNull: false,
    },
    strEmailAddress:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    strGender:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    strPassword:{
      type: DataTypes.STRING,
      allowNull: false,
    }
  },{
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'TUsers',
    initialAutoIncrement: 1
  });
  return User;
}
