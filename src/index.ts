import './LoadEnv'; // Must be the first import
import https from 'https';
import fs from 'fs';
import app from '@server';
import logger from '@shared/Logger';
import vhost from 'vhost';
import { embedly } from './hosts/embedly';
import { ipfsPlugin } from './hosts/ipfs-plugin';

// app.use(vhost('*', ipfsPlugin()));
app.use(vhost('embedly.remixproject.org', embedly()));
app.use(vhost('*.plugin.remixproject.org', ipfsPlugin()));

// Start the server
const port = Number(80);
app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});

const httpsServer = https.createServer({
    key: fs.readFileSync('/opt/ssl/server.key'),
    cert: fs.readFileSync('/opt/ssl/server.cert'),
  }, app);
  
httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});

