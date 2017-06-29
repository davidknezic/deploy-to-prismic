const Promise = require('bluebird');
const request = Promise.promisify(require('request'));
const { csrf } = require('./session');

const add = ({session, repository, email, cluster}) => {

  var headers = {
    'Content-Type': 'application/json',
    Cookie: 'SESSION=' + session
  };

  const url = 'https://' + repository + '.' + cluster.replace('https://', '') + '/app/settings/users/invite?_=' + csrf(session);

  var options = {
    url: url,
    method: 'POST',
    headers: headers,
    json: true,
    form: { email }
  };

  return request(options)
    .then(response => {
      if (response.statusCode !== 200) throw new Error('Could not add preview' + previewName + ': ' + response.statusCode + ' ' + response.body);
      return true;
    });
};

const accept = ({session, repository, cluster}) => {

  var headers = {
    'Content-Type': 'application/json',
    Cookie: 'SESSION=' + session
  };

  const url = cluster + '/app/dashboard/invitations/accept' +
    '?_=' + csrf(session) +
    '&domain=' + repository;

  var options = {
    url: url,
    method: 'POST',
    headers: headers,
    json: true,
    form: {}
  };

  return request(options)
    .then(response => {
      if (response.statusCode !== 303) throw new Error('Could accept repository' + repository + ': ' + response.statusCode + ' ' + response.body);
      return true;
    });
};

// profile = Writer|Manager|Administrator
const update = ({session, repository, email, profile, cluster}) => {

  var headers = {
    'Content-Type': 'application/json',
    Cookie: 'SESSION=' + session
  };

  const url = 'https://' + repository + '.' + cluster.replace('https://', '') + '/app/settings/users/profiles' +
    '?_=' + csrf(session) +
    '&email=' + email +
    '&profile=' + profile;

  var options = {
    url: url,
    method: 'POST',
    headers: headers,
    json: true,
    form: {}
  };

  return request(options)
    .then(response => {
      if (response.statusCode !== 200) throw new Error('Could not update user' + email + ': ' + response.statusCode + ' ' + response.body);
      return true;
    });
};





module.exports = { add, update, accept };
