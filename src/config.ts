const CONFIG = {
    DONATION: {
        ADDRESS: "0x661b5dc032bedb210f225df4b1aa2bdd669b38bc",
        MAPPING: [{
                name: "0.01",
                wei: 10000000000000000,
                msg: "🎉 Thank you! <3"
            },
            {
                name: "0.1",
                wei: 100000000000000000,
                msg: "🎉 Wow!, thank you! <33"
            },
            {
                name: "0.25",
                wei: 250000000000000000,
                msg: "🎉 *Gulp!*, thank you! <333"
            },
            {
                name: "1",
                wei: 1000000000000000000,
                msg: "🎉 Chad move! Thank you! <3333"
            }
        ]
    },
    CHAINS: [{
        chainId: 1,
        name: "Ethereum",
        bg: "#3c3c3d",
        color: "#FFF",
        api: `https://api.etherscan.io/api?module=account&action=txlist&address={address}&startblock=0&endblock=99999999&page=1&offset=0&sort=asc&apikey={apikey}`,
        default_api_key: `KFS4CK4IZ3MN4HUHKYS638TUCK8F4N91MP`,
        explorer_tx: `https://etherscan.io/tx/`,
        explorer_addr: `https://etherscan.io/address/`,
        rpc: `https://api.mycryptoapi.com/eth`,
        gas: `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey={apikey}`,
        ticker: `ETH`
    }, {
        chainId: 56,
        name: "BinanceSmartChain",
        bg: "#f3ba2f",
        color: "#222",
        api: `https://api.bscscan.com/api?module=account&action=txlist&address={address}&startblock=0&endblock=99999999&page=1&offset=0&sort=asc&apikey={apikey}`,
        default_api_key: `DNBXDD5IQE66C8HRABBZ3JNWTWFAVP5YVF`,
        explorer_tx: `https://bscscan.com/tx/`,
        explorer_addr: `https://bscscan.com/address/`,
        rpc: `https://bsc-dataseed.binance.org/`,
        gas: `https://api.bscscan.com/api?module=gastracker&action=gasoracle&apikey={apikey}`,
        ticker: `BNB`
    }, {
        chainId: 137,
        name: "Polygon",
        bg: "#8247e5",
        color: "#FFF",
        api: `https://api.polygonscan.com/api?module=account&action=txlist&address={address}&startblock=0&endblock=99999999&page=1&offset=0&sort=asc&apikey={apikey}`,
        default_api_key: `14BXANX7YQ81GY1RJSXXN9JBIRCJDC4EFA`,
        explorer_tx: `https://polygonscan.com/tx/`,
        explorer_addr: `https://polygonscan.com/address/`,
        rpc: `https://polygon-rpc.com`,
        gas: `https://api.polygonscan.com/api?module=gastracker&action=gasoracle&apikey={apikey}`,
        ticker: `MATIC`
    }, {
        chainId: 42,
        name: "Kovan",
        bg: "#dccff1",
        color: "#212121",
        api: `https://api-kovan.etherscan.io/api?module=account&action=txlist&address={address}&startblock=0&endblock=99999999&page=1&offset=0&sort=asc&apikey={apikey}`,
        default_api_key: `KFS4CK4IZ3MN4HUHKYS638TUCK8F4N91MP`,
        explorer_tx: `https://kovan.etherscan.io/tx/`,
        explorer_addr: `https://kovan.etherscan.io/address/`,
        rpc: `https://api.mycryptoapi.com/eth`,
        gas: ``,
        ticker: `KOV`
    }, {
        chainId: 4,
        name: "Rinkeby",
        bg: "#dccff1",
        color: "#212121",
        api: `https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address={address}&startblock=0&endblock=99999999&page=1&offset=0&sort=asc&apikey={apikey}`,
        default_api_key: `KFS4CK4IZ3MN4HUHKYS638TUCK8F4N91MP`,
        explorer_tx: `https://rinkeby.etherscan.io/tx/`,
        explorer_addr: `https://rinkeby.etherscan.io/address/`,
        rpc: `https://api.mycryptoapi.com/eth`,
        gas: ``,
        ticker: `RINK`
    }],
    ETH_SCAN: [{
        chainId: 1,
        contractAddress: "0x08A8fDBddc160A7d5b957256b903dCAb1aE512C5"
    }, {
        chainId: 56,
        contractAddress: "0x83cb147c13cba4ba4a5228bfde42c88c8f6881f6"
    }, {
        chainId: 137,
        contractAddress: "0xc60ca833aef1911c17d4e69fda9de6850402f6e5"
    }, {
        chainId: 42,
        contractAddress: "0x08A8fDBddc160A7d5b957256b903dCAb1aE512C5"
    }, {
        chainId: 4,
        contractAddress: "0x08A8fDBddc160A7d5b957256b903dCAb1aE512C5"
    }],
    TOKENS: {
        ENDPOINTS: [{
            chainId: 1,
            endpoint: "https://tokens.coingecko.com/uniswap/all.json"
        }, {
            chainId: 56,
            endpoint: "https://tokens.pancakeswap.finance/pancakeswap-extended.json"
        }, {
            chainId: 137,
            endpoint: "https://unpkg.com/quickswap-default-token-list@1.2.18/build/quickswap-default.tokenlist.json"
        }, {
            chainId: 42,
            endpoint: "https://tokens.coingecko.com/uniswap/all.json"
        }, {
            chainId: 4,
            endpoint: "https://tokens.coingecko.com/uniswap/all.json"
        }],
        ADDITIONAL_TOKENS: [{
            chainId: 56,
            address: "0x2859e4544C4bB03966803b044A93563Bd2D0DD4D",
            symbol: "SHIB",
            decimals: 18,
            logoURI: ""
        }, {
            chainId: 137,
            address: "0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
            symbol: "AVAX",
            decimals: 18,
            logoURI: ""
        }, {
            chainId: 137,
            address: "0x9d47b3faa5ff227d2bd404f572ef0ab0c8409161",
            symbol: "VALX",
            decimals: 18,
            logoURI: ""
        }, {
            chainId: 42,
            address: "0xa36085F69e2889c224210F603D836748e7dC0088",
            symbol: "LINK",
            decimals: 18,
            logoURI: ""
        }, {
            chainId: 42,
            address: "0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa",
            symbol: "DAI",
            decimals: 18,
            logoURI: ""
        }]
    },
    NFTS: {
        ENDPOINTS: [{
            chainId: 1,
            endpoint: "",
        }, {
            chainId: 56,
            endpoint: ""
        }, {
            chainId: 137,
            endpoint: ""
        }, {
            chainId: 42,
            endpoint: ""
        }, {
            chainId: 4,
            endpoint: "https://eoa-migrator-api.herokuapp.com/wallet/nfts/?address={address}&network=4"
        }]
    }
}

export default CONFIG;