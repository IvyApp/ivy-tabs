const { cd, echo, exec, touch } = require('shelljs');
const url = require('url');

const pkg = require('../package.json');

const { host, path } = url.parse(pkg.repository);
const repository = (host || '') + (path || '');

echo('Deploying docs');
cd('dist');
touch('.nojekyll');
exec('git init');
exec('git add .');
exec('git config user.name "Dray Lacy"');
exec('git config user.email "dray@envylabs.com"');
exec('git commit -m "docs: update gh-pages"');
exec(
  `git push --force --quiet "https://${process.env.GH_TOKEN}@${repository}" master:gh-pages`
);
echo('Docs deployed');
