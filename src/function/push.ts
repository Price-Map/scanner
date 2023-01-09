
import { Handler, HandlerEvent, HandlerContext, HandlerResponse } from "@netlify/functions";
import { DynamoDBClient, PutItemCommand, PutItemCommandInput, PutItemCommandOutput } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

const client = new DynamoDBClient({
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID ?? '',
        secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY ?? ''
    }
});

const run = async function (data: any) {
    try {
        const item: PutItemCommandInput = {
            TableName: "nfce",
            Item: marshall({
                "code": data.code,
                "url": data.url,
                "timestamp": Date.now()
            })
        }
        const result: PutItemCommandOutput = await client.send(new PutItemCommand(item));

        console.log(result);
        } catch (err: any) {
            console.error(err)
            throw new Error(err);
        }
    };

    const handler: Handler = async (event: HandlerEvent, context: HandlerContext): Promise<HandlerResponse> => {
        const body = event.body ?? '{ }'
        console.log('body:', body)
        const data = JSON.parse(body)
        await run(data);

        return {
            statusCode: 200,
            //body: JSON.stringify(result)
        }
    };

    export { handler };
