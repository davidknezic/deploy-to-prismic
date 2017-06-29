const Promise = require('bluebird');
const request = Promise.promisify(require('request'));
const { csrf } = require('./session');

const add = ({session, repository, previewURL, previewName, cluster}) => {

  var headers = {
    'Content-Type': 'application/json',
    Cookie: 'SESSION=' + session
  };

  const url = 'https://' + repository + '.' + cluster.replace('https://', '') + '/previews/new?_=' + csrf(session);

  var options = {
    url: url,
    method: 'POST',
    headers: headers,
    json: true,
    form: { 'site-name': previewName, 'preview-url': previewURL }
  };

  return request(options)
    .then(response => {
      if (response.statusCode !== 200) throw new Error('Could not add previw' + previewName + ': ' + response.statusCode + ' ' + response.body);
      return true;
    });
};


module.exports = { add };
