import { StackContext, NextjsSite, use } from "sst/constructs"
import { API } from "./api"

export function Site({ stack }: StackContext) {
    const api = use(API);
    const site = new NextjsSite(stack, "Site", {
      bind: [api],
      path: "bill-splitter/",
      environment: {
        NEXT_PUBLIC_API_URL: api.url,
      },
    });
  
    // Add the site's URL to stack output
    stack.addOutputs({
      URL: site.url,
    });
}
