const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));

const login = ({cluster, email, password}) => {
  var jar = request.jar();
  return request
    .postAsync({ url: cluster + '/authentication/signin', jar, followRedirect: false, form: { email, password } })
    .then(response => jar.getCookies(cluster).find(c => c.key === 'SESSION').value);
}

const csrf = (session) => session.replace(/"/g, '').split('C=')[1];

module.exports = { login, csrf };
