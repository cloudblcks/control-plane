import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const UpdateAccessRoleAssignment = z.object({
  id: z.number(),
  name: z.string(),
});

export default resolver.pipe(
  resolver.zod(UpdateAccessRoleAssignment),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const accessRoleAssignment = await db.accessRoleAssignment.update({
      where: { id },
      data,
    });

    return accessRoleAssignment;
  }
);
