import { Handler, HandlerEvent, HandlerContext, HandlerResponse } from "@netlify/functions";


const handler: Handler = async (event: HandlerEvent, context: HandlerContext): Promise<HandlerResponse> => {

    return {
        statusCode: 200
    }
};

export { handler };
