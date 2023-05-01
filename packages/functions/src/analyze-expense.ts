import {
  TextractClient,
  AnalyzeExpenseCommand,
} from "@aws-sdk/client-textract";

import { AnalyzeExpenseFormatter } from "@sst-bill-splitter/core/format-analyze-expense";

const client = new TextractClient({ region: "us-east-1" });

export const handler = async (event: any) => {
  if (!event.body) return { statusCode: 404, body: "Missing body" };

  const base64Image = event.body.split(',')[1]

  const input = {
    Document: {
      Bytes: Uint8Array.from(Buffer.from(base64Image, 'base64')),
    },
  };
  // TODO make sure we return name (item name), price, quantity.


  const command = new AnalyzeExpenseCommand(input);
  const analyzeExpenseResponse = await client.send(command);
  const response = AnalyzeExpenseFormatter(analyzeExpenseResponse);
  console.log('response', response);
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};
