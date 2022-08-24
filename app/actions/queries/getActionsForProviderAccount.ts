import { NotFoundError } from "blitz";
import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const GetActionsForProviderAccount = z.object({
  id: z.number()
});

export default resolver.pipe(
  resolver.zod(GetActionsForProviderAccount),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const actions = await db.provider.findFirst({ where: { id } }).Action();

    if (!actions) throw new NotFoundError();

    return actions;
  }
);
