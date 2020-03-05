import { Handler, Context, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as DynamoDB from '@aws-sdk/client-dynamodb';
import { GetItemInput } from '@aws-sdk/client-dynamodb/models';

const client = new DynamoDB.DynamoDBClient({});

const handler: Handler = async function(event: APIGatewayEvent, context: Context) : Promise<APIGatewayProxyResult> {
  // GetItemCommandInput is an alias for GetItemInput 
  const getItemParams: GetItemInput = {
    TableName: 'sandbox-table',
    Key: {
      pk: {S: 'sand'},
      sk: {S: 'box'}
    }
  };

  const getItem = new DynamoDB.GetItemCommand(getItemParams);

  const item = await client.send(getItem);

  return {
    statusCode: 200,
    body: JSON.stringify(item)
  };
}

export { handler };
