import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const CreateAccessRolePolicy = z.object({
  name: z.string(),
});

export default resolver.pipe(
  resolver.zod(CreateAccessRolePolicy),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const accessRolePolicy = await db.accessRolePolicy.create({ data: input });

    return accessRolePolicy;
  }
);
