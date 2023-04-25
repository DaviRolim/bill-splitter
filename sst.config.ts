import { SSTConfig } from "sst";
import { API } from "./stacks/api"
import { Site } from "./stacks/site"

export default {
  config(_input) {
    return {
      name: "sst-bill-splitter",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app
    .stack(API)
    .stack(Site)
    
  }
} satisfies SSTConfig;
