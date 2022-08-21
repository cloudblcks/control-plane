import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const CreatePolicyResource = z.object({
  name: z.string(),
});

export default resolver.pipe(
  resolver.zod(CreatePolicyResource),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const policyResource = await db.policyResource.create({ data: input });

    return policyResource;
  }
);
