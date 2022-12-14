import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const UpdateAction = z.object({
  id: z.number(),
  name: z.string(),
  provider_id: z.number()
});

export default resolver.pipe(
  resolver.zod(UpdateAction),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const action = await db.action.update({ where: { id }, data });

    return action;
  }
);
