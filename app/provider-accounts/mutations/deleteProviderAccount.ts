import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const DeleteProviderAccount = z.object({
  id: z.number(),
});

export default resolver.pipe(
  resolver.zod(DeleteProviderAccount),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const providerAccount = await db.providerAccount.deleteMany({
      where: { id },
    });

    return providerAccount;
  }
);
