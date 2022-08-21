import { paginate } from "blitz";
import { resolver } from "@blitzjs/rpc";
import db, { Prisma } from "db";

interface GetPolicyResourcesInput
  extends Pick<
    Prisma.PolicyResourceFindManyArgs,
    "where" | "orderBy" | "skip" | "take"
  > {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetPolicyResourcesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: policyResources,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.policyResource.count({ where }),
      query: (paginateArgs) =>
        db.policyResource.findMany({ ...paginateArgs, where, orderBy }),
    });

    return {
      policyResources,
      nextPage,
      hasMore,
      count,
    };
  }
);
