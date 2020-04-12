import connect from 'connect';

export const embedly = () => {
    const app = connect()
    // this handled the certbot certificate verification for *all* the sub domains
    app.use('/.well-known/acme-challenge/gZXPRhe30_st37TYHCoaJWDTy9t88dyh_Ed2LgCsAJk', (req: any, res: any, next: any) => {
        // http://embedly.remixproject.org/.well-known/acme-challenge/gZXPRhe30_st37TYHCoaJWDTy9t88dyh_Ed2LgCsAJk
        res.end('gZXPRhe30_st37TYHCoaJWDTy9t88dyh_Ed2LgCsAJk.z-Ci-m6_9kPk5sLq7yg3eE3LeJk7BT8BiRNv3Fvkhik')
        next()
    })

    app.use('/', (req: any, res: any, next: any) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            "version": "1.0",
            "type": "rich",
        
            "provider_name": "remix",
            "provider_url": "https://remix.ethereum.org",
        
            "author_name": "Remix team",
            "author_url": "https://remix-project.org",
        
            "html": "<iframe src=\"https://remix.ethereum.org\" width=\"700\" height=\"825\" scrolling=\"yes\" frameborder=\"0\" allowfullscreen></iframe>",
            "width": 700,
            "height": 825,
        
            "thumbnail_url": "https://remix.ethereum.org/assets/img/hexagon-remix-greengrey-texture.png",
            "thumbnail_width": 280,
            "thumbnail_height": 175,
        
            "referrer": "https://remix.ethereum.org",
            "cache_age": 3600,        
        }));
        next()
    })
    return app
}
