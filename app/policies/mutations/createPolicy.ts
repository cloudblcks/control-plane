import { resolver } from "@blitzjs/rpc";
import { interopDefault } from "blitz";
import db from "db";
import { z } from "zod";

const CreatePolicy = z.object({
  name: z.string(),
  provider_account_id: z.number(),
  action_ids: z.array(z.number()),
  resource_id: z.number()
});

export default resolver.pipe(
  resolver.zod(CreatePolicy),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant

    const policyActionIdObjs = input.action_ids.map((x) => {return {action_id: x}})
    const policyData = {
      name: input.name,
      provider_account_id: input.provider_account_id,
      PolicyResources: {
        create: [
          {
            resource_id: input.resource_id
          }
        ]
      },
      PolicyActions: {
        create: policyActionIdObjs
      }
    }

    const policy = await db.policy.create({ data: policyData });

    return policy;
  }
);
