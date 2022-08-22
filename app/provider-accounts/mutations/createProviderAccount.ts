import { resolver } from "@blitzjs/rpc";
import db, { Prisma } from "db";
import { z } from "zod";

const CreateProviderAccount = z.object({
  name: z.string(),
  credentials: z.string(),
  provider: z.number(),
  user: z.number()
});

export default resolver.pipe(
  resolver.zod(CreateProviderAccount),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant

    const providerAccount = await db.providerAccount.create({ data: {
      name: input.name,
      credentials: input.credentials,
      provider_id: input.provider,
      userId: input.user
    } });

    return providerAccount;
  }
);
