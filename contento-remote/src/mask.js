const { csrf } = require('./session');
const Promise = require('bluebird');
const request = Promise.promisify(require('request'));

function prepare(maskJSON) {
  const mask = JSON.parse(maskJSON);
  const data = Object.keys(mask).reduce((data, key) => Object.assign(data, key[0] !== '@' ? { [key]: mask[key] } : {}), {});
  const repeatable = mask['@repeatable'] !== undefined ? mask['@repeatable'] : false;
  return JSON.stringify({ data, repeatable });
}


function update(maskJSON, session, project, maskName, cluster) {

  var headers = {
    'Content-Type': 'application/json',
    Cookie: 'SESSION=' + session
  };

  const url = 'https://' + project + '.' + cluster.replace('https://', '') + '/app/settings/masks/' + maskName + '.json?_=' + csrf(session);

  var options = {
    url: url,
    method: 'POST',
    headers: headers,
    body: maskJSON
  };

  return request(options)
    .then(response => {
      if (response.statusCode === 404) throw new Error('missing repository');
      if (response.statusCode !== 200) throw new Error('Could not save mask' + maskName + ': ' + response.statusCode + ' ' + response.body);
      const maskInfo = JSON.parse(response.body).repository.masks[maskName];
      return maskInfo;
    });
}

function rename(session, project, maskName, maskLabel, cluster) {

  var headers = {
    'Content-Type': 'application/json',
    Cookie: 'SESSION=' + session
  };

  const url = 'https://' + project + '.' + cluster.replace('https://', '') + '/app/settings/masks/' + maskName + '?_=' + csrf(session);

  var options = {
    url: url,
    method: 'POST',
    headers: headers,
    form: { label: maskLabel }
  };

  return request(options)
    .then(response => {
      if (response.statusCode !== 200) throw new Error('Could not save mask' + maskName + ': ' + response.statusCode + ' ' + response.body);
      return;
    });
}


function create(session, project, maskName, maskLabel, repeatable, cluster) {

  var headers = {
    'Content-Type': 'application/json',
    Cookie: 'SESSION=' + session
  };

  const url = 'https://' + project + '.' + cluster.replace('https://', '') + '/app/settings/masks?_=' + csrf(session);

  var options = {
    url: url,
    method: 'POST',
    headers: headers,
    json: true,
    form: { id: maskName, label: maskLabel, repeatable, isOnboarding: false }
  };

  return request(options)
    .then(response => {
      if (response.body.id && response.body.id.alreadyused) return false;
      if (response.statusCode !== 200) throw new Error('Could not save mask' + maskName + ': ' + response.statusCode + ' ' + response.body);
      return true;
    });
}

function save({maskName, maskJSON, repository ,session, cluster}) {
  const { ['@title']: maskLabel, ['@repeatable']: repeatable } = JSON.parse(maskJSON);
  const mask = prepare(maskJSON);
  return create(session, repository, maskName, maskLabel || maskName, repeatable, cluster)
    .then(() => update(mask, session, repository, maskName, cluster));
}

module.exports = { save };
