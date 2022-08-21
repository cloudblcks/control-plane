import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const UpdatePolicy = z.object({
  id: z.number(),
  name: z.string(),
});

export default resolver.pipe(
  resolver.zod(UpdatePolicy),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const policy = await db.policy.update({ where: { id }, data });

    return policy;
  }
);
