const hre = require('hardhat');
const { network } = require('hardhat');

const networks = ['ethereum-sepolia-testnet'];

module.exports = async ({ deployments }) => {
  if (networks.includes(network.name)) {
    const TestnetUsdc = await deployments.get('TestnetUsdc');
    await hre.run('verify:verify', {
      address: TestnetUsdc.address,
    });
  } else {
    throw new Error(`${network.name} is not supported`);
  }
};
module.exports.tags = ['verify'];
