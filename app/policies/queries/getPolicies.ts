import { paginate } from "blitz";
import { resolver } from "@blitzjs/rpc";
import db, { Prisma } from "db";

interface GetPoliciesInput
  extends Pick<
    Prisma.PolicyFindManyArgs,
    "where" | "orderBy" | "skip" | "take"
  > {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetPoliciesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: policies,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.policy.count({ where }),
      query: (paginateArgs) =>
        db.policy.findMany({ ...paginateArgs, where, orderBy }),
    });

    return {
      policies,
      nextPage,
      hasMore,
      count,
    };
  }
);
