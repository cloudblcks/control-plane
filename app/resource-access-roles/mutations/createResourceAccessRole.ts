import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const CreateResourceAccessRole = z.object({
  access_role_id: z.number(),
  resource_id: z.number()
});

export default resolver.pipe(
  resolver.zod(CreateResourceAccessRole),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const resourceAccessRole = await db.resourceAccessRoles.create({ data: input });

    return resourceAccessRole;
  }
);
