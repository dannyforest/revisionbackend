const axios = require('axios');

exports.graphQLQuery = (query, variables) =>
    axios({
        url: 'https://32tjk7bms5dhjj3hhefmdpqtoq.appsync-api.us-east-1.amazonaws.com/graphql',
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": 'da2-zqdzk46ncfct5p5cgp2pczc3om',
        },
        data: {
            query, variables
        },
    });
