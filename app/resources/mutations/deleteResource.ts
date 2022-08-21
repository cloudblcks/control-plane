import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const DeleteResource = z.object({
  id: z.number(),
});

export default resolver.pipe(
  resolver.zod(DeleteResource),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const resource = await db.resource.deleteMany({ where: { id } });

    return resource;
  }
);
