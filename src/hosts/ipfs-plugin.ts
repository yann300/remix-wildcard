import connect from 'connect';
var proxy = require('express-http-proxy');

var requestAmount = 0


export const ipfsPlugin = () => {
    const app = connect()
    var orgtime = 0
    setInterval(() => {
        orgtime += 60
        const average = requestAmount / orgtime
        console.log(average, 'request / min')
    }, 60000)
    app.use('/ipfs', function (req: any, res: any, next: any) {
        console.log(req.url)
        requestAmount++
        res.set('x-frame-options', '')
        next();
    });
    app.use('/ipfs', proxy('https://ipfs-cluster.ethdevops.io', {
        proxyReqPathResolver: (req: any) => {
            return new Promise((resolve, reject) => resolve('/ipfs' + req.url));
        }
    }))
    return app
}
