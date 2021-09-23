'use strict';

const getChannelURL = require('ember-source-channel-url');

module.exports = async function() {
  return {
    scenarios: 
      {
        name: 'ember-lts-3.24',
        npm: {
          devDependencies: {
            'ember-source': '~3.24.0'
          }
        }
      },
      {
        name: 'ember-release',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('release')
          }
        }
      },
      {
        name: 'ember-beta',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('beta')
          }
        }
      },
      {
        name: 'ember-canary',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('canary')
          }
        }
      },
      {
        env: {
          EMBER_OPTIONAL_FEATURES: JSON.stringify({
            'jquery-integration': true
          })
        },
        name: 'ember-default-with-jquery',
        npm: {
          devDependencies: {
            '@ember/jquery': '^0.5.1'
          }
        }
      },
      {
        env: {
          EMBER_OPTIONAL_FEATURES: JSON.stringify({
            'application-template-wrapper': true,
            'default-async-observers': false,
            'template-only-glimmer-components': false
          })
        },
        name: 'ember-classic',
        npm: {
          ember: {
            edition: 'classic'
          }
        }
      }
    ],
    useYarn: true
  };
};
