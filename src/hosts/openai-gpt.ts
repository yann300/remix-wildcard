import express, { Request } from 'express';
import { Configuration, OpenAIApi, CreateChatCompletionResponse } from 'openai'
import cors from 'cors'

export const openaigpt = () => {
    const apiToken = process.env['OPENAIGPT_API_TOKEN']
    const configuration = new Configuration({
        apiKey: apiToken,
      });
    const openai = new OpenAIApi(configuration)
    const app = express()
    const ips = new Map<string, number>()
    app.use(cors())
    app.post('/', async (req: Request, res: any, next: any) => {
        if (ips.get(req.ip) && Date.now() - (ips.get(req.ip) as number) < 2000) { // 1 call every 2 seconds
          return
        }
        ips.set(req.ip, Date.now())
        const prompt = req.body.prompt
        const result = await openai.createChatCompletion(
            {
              model: "gpt-4",
              messages: [{role: "user", content: prompt}]
            },
            {
              timeout: 60000,
              headers: {
                "Authorization": `Bearer ${apiToken}`,
              },
            }
          )
          const response: CreateChatCompletionResponse = result.data
        
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response));
        next()
    })
    return app
}
