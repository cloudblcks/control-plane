import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const UpdatePolicyResource = z.object({
  id: z.number(),
  name: z.string(),
});

export default resolver.pipe(
  resolver.zod(UpdatePolicyResource),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const policyResource = await db.policyResource.update({
      where: { id },
      data,
    });

    return policyResource;
  }
);
