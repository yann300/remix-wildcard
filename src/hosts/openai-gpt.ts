import express from 'express';
import { Configuration, OpenAIApi, CreateChatCompletionResponse } from 'openai'

export const openaigpt = () => {
    const apiToken = process.env['OPENAIGPT_API_TOKEN']
    const configuration = new Configuration({
        apiKey: apiToken,
      });
    const openai = new OpenAIApi(configuration)
    const app = express()
    
    app.post('/', async (req: any, res: any, next: any) => {
        const prompt = req.body.prompt
        const result = await openai.createChatCompletion(
            {
              model: "gpt-3.5-turbo",
              messages: [{role: "user", content: prompt}]
            },
            {
              timeout: 10000,
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
