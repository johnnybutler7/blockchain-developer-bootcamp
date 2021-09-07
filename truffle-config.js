require('babel-register');
require('babel-polyfill');
require('dotenv').config();
//const HDWalletProvider = require('truffle-hdwallet-provider-privkey') //Kovan
const HDWalletProvider = require('@truffle/hdwallet-provider');
const privateKeys = process.env.PRIVATE_KEYS || ''
const projectID = process.env.INFURA_API_KEY

// var privateKeys = [
//  'xxxx', 'xxxx'
// ];

module.exports = {

  networks: {

      development: {
        host: "127.0.0.1",     // Localhost (default: none)
        port: 7545,            // Standard Ethereum port (default: none)
        network_id: "*",       // Any network (default: none)
      },
      kovan: {
        provider: function(){
          return new HDWalletProvider(
            privateKeys.split(','),
            'https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}'
          )
        },
        gas: 5000000,
        gasPrice: 25000000000,
        network_id: 42
      },
      ropsten: {
      provider: function() {
        return new HDWalletProvider(privateKeys.split(','), `https://ropsten.infura.io/v3/${projectID}`, 0, 2)
      },
      network_id: 3,
      gas: 5000000,
      gasPrice: 25000000000,
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)   //make sure this gas allocation isn't over 4M, which is the max
    }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  // Configure your compilers
  compilers: {
    solc: {
      // version: "0.5.1",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: false,
         runs: 200
       },
      //  evmVersion: "byzantium"
      // }
    }
  },

  db: {
    enabled: false
  }
};
