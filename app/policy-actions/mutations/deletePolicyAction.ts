import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const DeletePolicyAction = z.object({
  id: z.number(),
});

export default resolver.pipe(
  resolver.zod(DeletePolicyAction),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const policyAction = await db.policyAction.deleteMany({ where: { id } });

    return policyAction;
  }
);
