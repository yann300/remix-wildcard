import connect from 'connect';
const { createProxyMiddleware } = require('http-proxy-middleware');

export const ipfsGatewayPlugin = () => {
    const app = connect()
    app.use('/ipfs', createProxyMiddleware({ target: 'https://ipfs.ethdevops.io/', changeOrigin: true }));
    app.use('/', createProxyMiddleware({ target: 'https://ipfs-api.ethdevops.io/', changeOrigin: true }));
    return app
}