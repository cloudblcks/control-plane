import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const DeleteAccessRole = z.object({
  id: z.number(),
});

export default resolver.pipe(
  resolver.zod(DeleteAccessRole),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const accessRole = await db.accessRole.deleteMany({ where: { id } });

    return accessRole;
  }
);
