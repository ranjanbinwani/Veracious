/* Configuration for Ganache */
// module.exports = {
//   networks: {
//     development: {
//       host: "127.0.0.1",
//       port: 7545,
//       network_id: "*"
//     }
//   }
// };

/* Configuration for Rinkeby network */
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = <your metamask mnemonic>;
var INFURA_API_KEY = <your infura api key>;
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          "https://rinkeby.infura.io/v3/" + INFURA_API_KEY
        ),
      network_id: 4,
      gas: 4712388,
      gasPrice: 100000000000
    }
  }
};
