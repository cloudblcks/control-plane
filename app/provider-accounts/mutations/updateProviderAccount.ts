import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const UpdateProviderAccount = z.object({
  id: z.number(),
  name: z.string(),
  credentials: z.string(),
  user: z.number(),
  provider: z.number()
});

export default resolver.pipe(
  resolver.zod(UpdateProviderAccount),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const providerAccount = await db.providerAccount.update({
      where: { id },
      data: {
        name: data.name,
        credentials: data.credentials,
        provider_id: data.provider,
        userId: data.user
      }
    });

    return providerAccount;
  }
);
