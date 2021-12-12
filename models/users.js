'use strict';
module.exports = (sequelize, DataTypes) => {
	const Users = sequelize.define('Users', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		user_image: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		mobile_number: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		gender: {
			type: DataTypes.ENUM('male', 'female'),
			allowNull: true,
		},
		password: {
			type: DataTypes.STRING,
		},
		last_login_date: {
			type: DataTypes.DATE,
		},
		created_at:
		{
			type: DataTypes.DATE,
		},
		updated_at: {
			type: DataTypes.DATE,
		},
	}, 
	{
		underscored: true,
	})

	Users.associate = (models) => {
    Users.belongsTo(models.Roles, {
			foreignKey: 'role_id'
		});
  };

  return Users;
};