import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const CreatePolicy = z.object({
  name: z.string(),
});

export default resolver.pipe(
  resolver.zod(CreatePolicy),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const policy = await db.policy.create({ data: input });

    return policy;
  }
);
