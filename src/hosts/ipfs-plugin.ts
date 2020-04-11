import connect from 'connect';
import request from 'request';

export const ipfsPlugin = () => {
    const app = connect()
    app.use((req: any, res: any, next: any) => {
        console.log(req)
        const path = 'https://ipfsgw.komputing.org/ipfs/QmQmK435v4io3cp6N9aWQHYmgLxpUejjC1RmZCbqL7MJaM/' + req.path
        request(path).pipe(res)
    })
    return app
}
