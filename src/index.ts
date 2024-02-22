import './LoadEnv' // Must be the first import
import https from 'https'
import fs from 'fs'
import app from '@server'
import logger from '@shared/Logger'
import vhost from 'vhost'
import { embedly } from './hosts/embedly'
import { ipfsPlugin } from './hosts/ipfs-plugin'
import { remixProject } from './hosts/remix-project'
import { ipfsGatewayPlugin } from './hosts/ipfs-gateway-plugins'
import { corsProxy } from './hosts/corsproxy'
import { vyperProxy } from './hosts/vyperproxy'
import { vyper2Proxy } from './hosts/vyper2'
import { openaigpt } from './hosts/openai-gpt'
import { solcoder } from './hosts/solcoder'
import { gptchat } from './hosts/gpt-chat'
import { RSS } from './hosts/rss';
import morgan from 'morgan';
import { StatusPlugin } from './hosts/status'

// log using winston
app.use(morgan('common', {
    stream: fs.createWriteStream('./access.log', {flags: 'a'})
}));
app.use(morgan('dev'));


// app.use(vhost('*', remixProject()));
app.use(vhost('remixproject.org', remixProject()))
app.use(vhost('www.remixproject.org', remixProject()))
app.use(vhost('embedly.remixproject.org', embedly()))
app.use(vhost('*.dyn.plugin.remixproject.org', ipfsPlugin()))
app.use(vhost('jqgt.remixproject.org', ipfsGatewayPlugin()))
app.use(vhost('corsproxy.remixproject.org', corsProxy()))
app.use(vhost('vyper.remixproject.org', vyperProxy()))
app.use(vhost('vyper2.remixproject.org', vyper2Proxy()))
app.use(vhost('rss.remixproject.org', RSS()))
app.use(vhost('status.remixproject.org', StatusPlugin()))
app.use(vhost('openai-gpt.remixproject.org', openaigpt()))
app.use(vhost('solcoder.remixproject.org', solcoder()))
app.use(vhost('gpt-chat.remixproject.org', gptchat()))
// Start the server
const port = Number(80);
app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});

try {
    const httpsServer = https.createServer({
        key: fs.readFileSync('/etc/letsencrypt/live/remixproject.org/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/remixproject.org/fullchain.pem'),
      }, app);
      
    httpsServer.listen(443, () => {
        logger.info('HTTPS Server running on port 443');
    });
} catch (e) {
    console.warn(e)
}


