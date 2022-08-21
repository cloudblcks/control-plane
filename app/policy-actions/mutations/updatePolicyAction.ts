import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const UpdatePolicyAction = z.object({
  id: z.number(),
  name: z.string(),
});

export default resolver.pipe(
  resolver.zod(UpdatePolicyAction),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const policyAction = await db.policyAction.update({ where: { id }, data });

    return policyAction;
  }
);