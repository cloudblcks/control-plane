import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const UpdateProvider = z.object({
  id: z.number(),
  name: z.string(),
});

export default resolver.pipe(
  resolver.zod(UpdateProvider),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const provider = await db.provider.update({ where: { id }, data });

    return provider;
  }
);
