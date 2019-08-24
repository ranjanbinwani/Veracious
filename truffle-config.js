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
var mnemonic =
  "image antique foam cannon gaze genuine sign table element defense carbon gasp";
var INFURA_API_KEY = "0dc8e842be5f45bc838891057d6340d5";
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8548,
      network_id: "*"
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          "https://rinkeby.infura.io/v3/" + INFURA_API_KEY
        ),
      network_id: 4,
      gas: 4000000,
      gasPrice: 10000000000
    }
  }
};
