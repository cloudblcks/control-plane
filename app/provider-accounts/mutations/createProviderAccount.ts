import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const CreateProviderAccount = z.object({
  name: z.string(),
});

export default resolver.pipe(
  resolver.zod(CreateProviderAccount),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const providerAccount = await db.providerAccount.create({ data: input });

    return providerAccount;
  }
);
