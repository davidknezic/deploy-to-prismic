const Promise = require('bluebird');
const request = Promise.promisify(require('request'));
const { JSDOM } = require('jsdom');

const exists = ({repository, cluster, session}) => {
  var headers = {
    'Content-Type': 'application/json',
    Cookie: 'SESSION=' + session
  };

  const url = 'https://' + cluster.replace('https://', '') + `/app/dashboard/repositories/${repository}/exists`;

  var options = {
    url: url,
    method: 'GET',
    headers: headers,
    json: true
  };

  return request(options)
    .then(response => {
      if (response.statusCode !== 200) throw new Error('oops' + JSON.stringify(response.body));
      return response.body === false;
    });

}

const list = ({cluster, session}) => {
  var headers = {
    'Content-Type': 'application/json',
    Cookie: 'SESSION=' + session
  };

  const url = 'https://' + cluster.replace('https://', '') + '/app/dashboard';

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

      const repositories = window.document.getElementById('repositories');

      const results = [];

      for (let i = 0; i < repositories.children.length; i++) {
        const repository = repositories.children[i];

        if (!repository.getAttribute('href')) continue

        const backgroundImageStyle = repository.querySelector('.uploaded').style.backgroundImage || '';
        const backgroundImageMatch = backgroundImageStyle.match(/url\((.*?)\)/)

        const userCountText = repository.querySelector('.user').textContent.trim()
        const userCountMatch = userCountText.match(/(\d+)/)

        results.push({
          url: repository.getAttribute('href'),
          name: repository.querySelector('h3').textContent.trim(),
          avatarUrl: backgroundImageMatch ? backgroundImageMatch[1] || null : null,
          avatarColor: repository.querySelector('.default').style.backgroundColor,
          userCount: userCountMatch ? parseInt(userCountMatch[1]) || null : null,
        });
      }

      return results;
    });

}

const add = ({repository, cluster, session}) => {

  var headers = {
    'Content-Type': 'application/json',
    Cookie: 'SESSION=' + session
  };

  const url = 'https://' + cluster.replace('https://', '') + '/authentication/newrepository';

  var options = {
    url: url,
    method: 'POST',
    headers: headers,
    json: true,
    form: { domain: repository, name: repository, plan: 'personal', isAnnual: 'false' }
  };

  return request(options)
    .then(response => {
      if (response.statusCode !== 200) throw new Error('oops' + JSON.stringify(response.body));
      return true;
    });

};


module.exports = { exists, list, add };
