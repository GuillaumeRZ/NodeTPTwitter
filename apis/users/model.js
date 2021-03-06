/**
 * Define the user model.
 */

module.exports = (database, types) => {
  return database.define('user', {
    username: {
      type: types.STRING,
      unique: true,
      allowNull: false,
      validate: {
        min: 1,
        max: 30,
        is: ['^[a-z0-9]+$', 'i']
      }
    },
    first_name: {
      type: types.STRING
    },
    last_name: {
      type: types.STRING
    },
    password: {
      type: types.STRING,
      allowNull: false
    },
    email: {
      type: types.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    biography: {
      type: types.TEXT,
      validate: {
        max: 400
      }
    }
  }, {
    underscored: true,
    hooks: {
      beforeDestroy: (user) => {
        database.models.tweet.destroy({
          where: {
            user_id: user.id
          }
        })
      }
    },
    classMethods: {
      associate: models => {
        models.user.hasMany(models.tweet, {
          onDelete: 'cascade'
        });
        models.user.belongsToMany(models.user, {
          as: 'followers',
          through: 'users__following'
        });
      }
    }
  });
};
