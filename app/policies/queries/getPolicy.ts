import { NotFoundError } from "blitz";
import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const GetPolicy = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
});

export default resolver.pipe(
  resolver.zod(GetPolicy),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const policy = await db.policy.findFirst({ where: { id }, include: {
      PolicyActions: true,
      PolicyResources: true
    } });

    if (!policy) throw new NotFoundError();

    return policy;
  }
);
