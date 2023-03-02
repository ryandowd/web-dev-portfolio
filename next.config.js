/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

const nextConfig = (phase) => {
  const isDevelopment = (phase = PHASE_DEVELOPMENT_SERVER);

  return {
    env: {
      mongodb_username: 'ryandowd84',
      mongodb_password: 'xk2FfVMxDpU2UzUF',
      mongodb_clustername: 'ryans-awesome-cluster',
      mongodb_database: isDevelopment ? 'portfolio_dev' : 'portfolio',
    },
    reactStrictMode: true,
  };
};

module.exports = nextConfig;
