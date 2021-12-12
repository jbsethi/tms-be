'use strict';
module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    RoleName: DataTypes.STRING,
    created_at:
		{
			type: DataTypes.DATE,
		},
		updated_at: {
			type: DataTypes.DATE,
		},
  })

  Roles.associate = (models) => {
    Roles.hasMany(models.Users);
  };

  return Roles;
};