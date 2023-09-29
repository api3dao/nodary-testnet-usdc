const fs = require('fs');
const path = require('path');
const hre = require('hardhat');

const networks = ['ethereum-sepolia-testnet'];

module.exports = async () => {
  const references = {};
  references.chainNames = {};
  for (const network of networks) {
    references.chainNames[hre.config.networks[network].chainId] = network;
  }
  const deploymentBlockNumbers = { chainNames: references.chainNames };

  for (const contractName of ['TestnetUsdc']) {
    references[contractName] = {};
    deploymentBlockNumbers[contractName] = {};
    for (const network of networks) {
      const deployment = JSON.parse(fs.readFileSync(path.join('deployments', network, `${contractName}.json`), 'utf8'));
      references[contractName][hre.config.networks[network].chainId] = deployment.address;
      if (deployment.receipt) {
        deploymentBlockNumbers[contractName][hre.config.networks[network].chainId] = deployment.receipt.blockNumber;
      } else {
        deploymentBlockNumbers[contractName][hre.config.networks[network].chainId] = 'MISSING';
      }
    }
  }

  fs.writeFileSync(path.join('deployments', 'references.json'), JSON.stringify(references, null, 2));
  fs.writeFileSync(
    path.join('deployments', 'deployment-block-numbers.json'),
    JSON.stringify(deploymentBlockNumbers, null, 2)
  );
};
module.exports.tags = ['document'];
