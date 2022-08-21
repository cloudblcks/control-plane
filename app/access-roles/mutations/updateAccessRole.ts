import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const UpdateAccessRole = z.object({
  id: z.number(),
  name: z.string(),
});

export default resolver.pipe(
  resolver.zod(UpdateAccessRole),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const accessRole = await db.accessRole.update({ where: { id }, data });

    return accessRole;
  }
);
