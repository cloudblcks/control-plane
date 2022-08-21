import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const CreateAccessRoleAssignment = z.object({
  name: z.string(),
});

export default resolver.pipe(
  resolver.zod(CreateAccessRoleAssignment),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const accessRoleAssignment = await db.accessRoleAssignment.create({
      data: input,
    });

    return accessRoleAssignment;
  }
);
