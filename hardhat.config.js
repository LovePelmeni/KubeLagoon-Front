module.exports = {
    defaultNetwork: "rinkeby",
    networks: {
      hardhat: {
      },
      rinkeby: {
        url: "https://eth-rinkeby.alchemyapi.io/v2/123abc123abc123abc123abc123abcde",
        accounts: [process.env.HARDHAT_PRIVATE_KEY],
      }
    },
    solidity: {
      version: "0.8.8",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    },
    paths: {
      sources: "./crypto_support",
      tests: "./crypto_tests",
      cache: "./cache",
      artifacts: "./artifacts"
    },
    mocha: {
      timeout: 40000
    }
  }