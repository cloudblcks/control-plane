import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const CreatePolicyAction = z.object({
  name: z.string(),
});

export default resolver.pipe(
  resolver.zod(CreatePolicyAction),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const policyAction = await db.policyAction.create({ data: input });

    return policyAction;
  }
);
