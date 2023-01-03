import connect from 'connect';
const { createProxyMiddleware } = require('http-proxy-middleware');

var requestAmount = 0


export const ipfsPlugin = () => {
    const app = connect() 

    
    app.use('/', createProxyMiddleware({ target: 'https://ipfs.io/', changeOrigin: true }));
    return app
}
