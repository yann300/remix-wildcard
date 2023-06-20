import connect from 'connect';
const { createProxyMiddleware } = require('http-proxy-middleware');

export const ipfsGatewayPlugin = () => {
    const app = connect()
    app.use('/', createProxyMiddleware({ target: 'https://medium.com/feed/remix-ide', changeOrigin: true }));
    return app
}