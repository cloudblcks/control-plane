import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const DeleteAccessRolePolicy = z.object({
  id: z.number(),
});

export default resolver.pipe(
  resolver.zod(DeleteAccessRolePolicy),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const accessRolePolicy = await db.accessRolePolicy.deleteMany({
      where: { id },
    });

    return accessRolePolicy;
  }
);
