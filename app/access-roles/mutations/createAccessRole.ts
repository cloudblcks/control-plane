import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const CreateAccessRole = z.object({
  name: z.string(),
});

export default resolver.pipe(
  resolver.zod(CreateAccessRole),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const accessRole = await db.accessRole.create({ data: input });

    return accessRole;
  }
);
