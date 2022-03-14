const CONFIG = {
    GAS: {
        ENDPOINT: "https://gas.mycryptoapi.com/"
    },
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
    ETH_SCAN: [{
        "chainId": 1,
        "contractAddress": "0x08A8fDBddc160A7d5b957256b903dCAb1aE512C5"
    }, {
        "chainId": 56,
        "contractAddress": "0x83cb147c13cba4ba4a5228bfde42c88c8f6881f6"
    }, {
        "chainId": 137,
        "contractAddress": "0xc60ca833aef1911c17d4e69fda9de6850402f6e5"
    }],
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
    }],
    TOKENS: {
        ENDPOINT: "https://tokens.coingecko.com/uniswap/all.json",
        ADDITIONAL_TOKENS: [{
            chainId: 56,
            address: "0x2859e4544C4bB03966803b044A93563Bd2D0DD4D",
            symbol: "SHIB",
            decimals: 18,
            logoURI: ""
        }]
    }
}

export default CONFIG;