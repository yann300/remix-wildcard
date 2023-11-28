import connect from 'connect'
import { responseInterceptor } from 'http-proxy-middleware'
const { createProxyMiddleware } = require('http-proxy-middleware')

export const gptchat = () => {
    const app = connect()
    app.use('/', createProxyMiddleware({
        target: 'http://localhost:9080/',
        changeOrigin: true,
        timeout: 1000 * 60 * 5,
        proxyTimeout: 1000 * 60 * 5,
        selfHandleResponse: true,
        onProxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
            // set the header so the browser doesn't complain
            res.setHeader('Access-Control-Allow-Origin', '*')
            return responseBuffer.toString('utf8')
        })
    }))
    return app
}
