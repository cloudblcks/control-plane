import { paginate } from "blitz";
import { resolver } from "@blitzjs/rpc";
import db, { Prisma } from "db";

interface GetPolicyActionsInput
  extends Pick<
    Prisma.PolicyActionFindManyArgs,
    "where" | "orderBy" | "skip" | "take"
  > {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetPolicyActionsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: policyActions,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.policyAction.count({ where }),
      query: (paginateArgs) =>
        db.policyAction.findMany({ ...paginateArgs, where, orderBy }),
    });

    return {
      policyActions,
      nextPage,
      hasMore,
      count,
    };
  }
);
