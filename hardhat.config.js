require('@nomicfoundation/hardhat-toolbox');
require('@nomiclabs/hardhat-etherscan');
require('hardhat-deploy');
const { hardhatConfig } = require('@api3/chains');
require('dotenv').config();

module.exports = {
  etherscan: hardhatConfig.etherscan(),
  networks: hardhatConfig.networks(),
  solidity: {
    version: '0.8.17',
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
};
