
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

const params: PutItemCommandInput = {
    TableName: "nfce",
    Item: marshall({
        "code": "blah",
        "year":  2021,
        "title": "The Big New Movie",
        "info": {
            "plot": "Nothing happens at all.",
            "rating": 0
        }
    })
};

const run = async function (): Promise<PutItemCommandOutput> {
    try {
        return await client.send(new PutItemCommand(params));
    } catch(err: any) {
        console.error(err)
        throw new Error(err);
    }
};

const handler: Handler = async (event: HandlerEvent, context: HandlerContext): Promise<HandlerResponse> => {
    const result = await run();
    console.log(result)
    return {
        statusCode: 200,
        body: JSON.stringify(result)
    }
};

export { handler };
