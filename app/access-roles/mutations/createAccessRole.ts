import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const CreateAccessRole = z.object({
  name: z.string(),
  policy_ids: z.array(z.number())
});

export default resolver.pipe(
  resolver.zod(CreateAccessRole),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const policyIdsObj = input.policy_ids.map((x) => {return {policy_id: x}})
    const accessRole = await db.accessRole.create({ data: {
      name: input.name,
      AccessRolePolicies: { create: policyIdsObj}
    } });

    return accessRole;
  }
);
