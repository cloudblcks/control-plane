import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const UpdateAccessRolePolicy = z.object({
  id: z.number(),
  name: z.string(),
});

export default resolver.pipe(
  resolver.zod(UpdateAccessRolePolicy),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const accessRolePolicy = await db.accessRolePolicy.update({
      where: { id },
      data,
    });

    return accessRolePolicy;
  }
);
