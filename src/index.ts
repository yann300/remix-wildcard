import './LoadEnv'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';
import vhost from 'vhost';
import { embedly } from './hosts/embedly';
import { ipfsPlugin } from './hosts/ipfs-plugin';

// Start the server
const port = Number(80);
app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
// app.use(vhost('*', ipfsPlugin()));
app.use(vhost('embedly.remixproject.org', embedly()));
app.use(vhost('*.plugin.remixproject.org', ipfsPlugin()));
