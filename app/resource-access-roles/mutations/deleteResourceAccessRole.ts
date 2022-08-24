import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const DeleteResourceAccessRole = z.object({
  id: z.number(),
});

export default resolver.pipe(
  resolver.zod(DeleteResourceAccessRole),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const resourceAccessRole = await db.resourceAccessRoles.deleteMany({
      where: { id },
    });

    return resourceAccessRole;
  }
);
