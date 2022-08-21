import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const DeletePolicy = z.object({
  id: z.number(),
});

export default resolver.pipe(
  resolver.zod(DeletePolicy),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const policy = await db.policy.deleteMany({ where: { id } });

    return policy;
  }
);
