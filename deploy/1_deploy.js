const { network } = require('hardhat');
const { ethers } = require('hardhat');

const networks = ['ethereum-sepolia-testnet'];

module.exports = async ({ getUnnamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const accounts = await getUnnamedAccounts();

  if (networks.includes(network.name)) {
    const testnetUsdc = await deploy('TestnetUsdc', {
      from: accounts[0],
      log: true,
      deterministicDeployment: process.env.DETERMINISTIC ? ethers.constants.HashZero : undefined,
    });
    log(`Deployed TestnetUsdc at ${testnetUsdc.address}`);
  } else {
    throw new Error(`${network.name} is not supported`);
  }
};
module.exports.tags = ['deploy'];
