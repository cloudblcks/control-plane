import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const CreateResource = z.object({
  name: z.string(),
  provider_account_id: z.number(),
  userId: z.number()
});

export default resolver.pipe(
  resolver.zod(CreateResource),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const resource = await db.resource.create({ data: input });

    return resource;
  }
);
