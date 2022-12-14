import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const UpdateResource = z.object({
  id: z.number(),
  name: z.string(),
  provider_account_id: z.number(),
  userId: z.number()
});

export default resolver.pipe(
  resolver.zod(UpdateResource),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const resource = await db.resource.update({ where: { id }, data });

    return resource;
  }
);
