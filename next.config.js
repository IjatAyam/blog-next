/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      env: {
        mongodb_username: 'jatyam',
        mongodb_password: '9gtpUAxLJbeVMO0E',
        mongodb_clustername: 'cluster0',
        mongodb_database: 'my-site-dev',
      },
    };
  }

  return {
    reactStrictMode: true,
    env: {
      mongodb_username: 'jatyam',
      mongodb_password: '9gtpUAxLJbeVMO0E',
      mongodb_clustername: 'cluster0',
      mongodb_database: 'my-site',
    },
  };
};
