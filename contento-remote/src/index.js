const { add: addPreview } = require('./preview');
const { exists: repositoryExists, list: listRepositories, add: addRepository } = require('./repository');
const { save: saveMask } = require('./mask');
const { update: updateUser, add: addUser, accept: acceptUser } = require('./user');
const { me } = require('./profile');
const { apiVisibility } = require('./security');

const { login } = require('./session');

module.exports = {
  acceptUser,
  addPreview,
  addRepository,
  addUser,
  apiVisibility,
  listRepositories,
  login,
  me,
  repositoryExists,
  saveMask,
  updateUser
};
