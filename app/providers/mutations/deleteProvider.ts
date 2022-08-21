import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const DeleteProvider = z.object({
  id: z.number(),
});

export default resolver.pipe(
  resolver.zod(DeleteProvider),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const provider = await db.provider.deleteMany({ where: { id } });

    return provider;
  }
);
