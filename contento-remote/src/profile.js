const Promise = require('bluebird');
const request = Promise.promisify(require('request'));
const { JSDOM } = require('jsdom');

const me = ({cluster, session}) => {
  var headers = {
    'Content-Type': 'application/json',
    Cookie: 'SESSION=' + session
  };

  const url = 'https://' + cluster.replace('https://', '') + '/app/profile';

  var options = {
    url: url,
    method: 'GET',
    headers: headers,
    json: false
  };

  return request(options)
    .then(response => {
      if (response.statusCode !== 200) throw new Error('oops' + JSON.stringify(response.body));

      const { window } = new JSDOM(response.body);

      const avatar = window.document.getElementsByClassName('img')[0].attributes['data-gravatar'].textContent;
      const firstname = window.document.getElementById('firstname').attributes['value'].textContent;
      const lastname = window.document.getElementById('lastname').attributes['value'].textContent;
      const displayname = window.document.getElementById('displayname').attributes['value'].textContent
                       || window.document.getElementById('displayname').attributes['placeholder'].textContent;

      return {
        avatar,
        firstName: firstname,
        lastName: lastname,
        displayName: displayname
      };
    });
}

module.exports = { me };
