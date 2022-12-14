import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const CreateAction = z.object({
  name: z.string(),
  provider_id: z.number()
});

export default resolver.pipe(
  resolver.zod(CreateAction),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const action = await db.action.create({ data: input });

    return action;
  }
);
