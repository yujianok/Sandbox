var config = {
    server: {
        port: 8090
    },
    es: {
        hosts: [
           '192.168.200.34:9200',
           '192.168.200.42:9200'
        ]
    },
    mysql: {
        host: '192.168.200.42',
        database:'hermes',
        user: 'darcy',
        password: 'F2y_YbuAvV9R',
        connectionLimit: 10
    }
};

module.exports = config;