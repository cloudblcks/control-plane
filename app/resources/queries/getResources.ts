import { paginate } from "blitz";
import { resolver } from "@blitzjs/rpc";
import db, { Prisma } from "db";

interface GetResourcesInput
  extends Pick<
    Prisma.ResourceFindManyArgs,
    "where" | "orderBy" | "skip" | "take"
  > {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetResourcesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: resources,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.resource.count({ where }),
      query: (paginateArgs) =>
        db.resource.findMany({ ...paginateArgs, where, orderBy }),
    });

    return {
      resources,
      nextPage,
      hasMore,
      count,
    };
  }
);
