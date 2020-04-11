import connect from 'connect';

export const embedly = () => {
    const app = connect()
    app.use((req: any, res: any, next: any) => {
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
