const Promise = require('bluebird');
const request = Promise.promisify(require('request'));
const { csrf } = require('./session');

const apiVisibility = ({session, repository, visibility, cluster}) => {

  var headers = {
    'Content-Type': 'application/json',
    Cookie: 'SESSION=' + session
  };

  const url = 'https://' + repository + '.' + cluster.replace('https://', '') + '/app/settings/api/security?_=' + csrf(session);

  var options = {
    url: url,
    method: 'POST',
    headers: headers,
    json: true,
    form: { 'api_security': visibility } // private|public|open
  };

  return request(options)
    .then(response => {
      if (response.statusCode !== 200) throw new Error('Could not change visibility to ' + visibility  + ': ' + response.statusCode + ' ' + response.body);
      return true;
    });
};


module.exports = { apiVisibility };
