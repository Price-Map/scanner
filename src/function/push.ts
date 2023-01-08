
import { Handler, HandlerEvent, HandlerContext, HandlerResponse } from "@netlify/functions";
import { DynamoDBClient, PutItemCommand, PutItemCommandInput, PutItemCommandOutput } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

const regexp = /\d{44}/;

const client = new DynamoDBClient({
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID ?? '',
        secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY ?? ''
    }
});

const run = async function (url: string) {
    try {
        const code = url.match(regexp)?.[0] ?? '';
        const item: PutItemCommandInput = {
            TableName: "nfce",
            Item: marshall({
                "code": code,
                "url": url,
                "timestamp": Date.now()
            })
        }
        const result = await client.send(new PutItemCommand(item));
        
        console.log(result);
        } catch (err: any) {
            console.error(err)
            throw new Error(err);
        }
    };

    const handler: Handler = async (event: HandlerEvent, context: HandlerContext): Promise<HandlerResponse> => {
        const url: string = (event.body as any).data
        await run(url);
        
        return {
            statusCode: 200,
            //body: JSON.stringify(result)
        }
    };

    export { handler };
