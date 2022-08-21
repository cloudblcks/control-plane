import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const CreateProvider = z.object({
  name: z.string(),
});

export default resolver.pipe(
  resolver.zod(CreateProvider),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const provider = await db.provider.create({ data: input });

    return provider;
  }
);
