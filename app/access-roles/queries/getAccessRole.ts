import { NotFoundError } from "blitz";
import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const GetAccessRole = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
});

export default resolver.pipe(
  resolver.zod(GetAccessRole),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const accessRole = await db.accessRole.findFirst({ where: { id }, include: {
      ResourceAccessRoles: {
        include: {
          resource: true
        }
      },
      AccessRolePolicies: {
        include: {
          policy: true
        }
      }
    } });

    if (!accessRole) throw new NotFoundError();

    return accessRole;
  }
);
