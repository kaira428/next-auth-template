const {PHASE_DEVELOPMENT_SERVER} = require('next/constants');

const nextConfig = {
  reactStrictMode: false,
}

// module.exports = (phase, { defaultConfig }) => {

module.exports = (phase, { nextConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: 'keng',
        mongodb_password: 'cnkwMiB3Icg6FImv',
        mongodb_clustername: 'wk-free-cluster',
        mongodb_database: 'auth-proj'
      }
      /* development only config options here */
    }
  }

  return {
    /* config options for all phases except development here */
    env: {
      mongodb_username: 'keng',
      mongodb_password: 'cnkwMiB3Icg6FImv',
      mongodb_clustername: 'wk-free-cluster',
      mongodb_database: 'auth-proj-prod'
    }
  }
}
