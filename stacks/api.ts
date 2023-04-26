import { StackContext, Function } from "sst/constructs";
import { PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";


export function API({ stack }: StackContext) {
  const lambdaFn = new Function(stack, "MyFunction", {
    handler: "packages/functions/src/analyze-expense.handler",
    timeout: 60,
    url: true,
  });
  // const api = new Api(stack, "api", {
  //   routes: {
  //     "POST /": {
  //       function: {
  //         handler: "packages/functions/src/analyze-expense.handler",
  //         timeout: 300
  //       }
  //     },
  //   },
  // });
  lambdaFn.attachPermissions([
    new PolicyStatement({
      actions: ["textract:*"],
      effect: Effect.ALLOW,
      resources: ["*"],
    }),
  ]);

  stack.addOutputs({
    ApiEndpoint: lambdaFn.url,
  });
  return lambdaFn
}
