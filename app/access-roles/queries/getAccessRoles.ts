import { paginate } from "blitz";
import { resolver } from "@blitzjs/rpc";
import db, { Prisma } from "db";

interface GetAccessRolesInput
  extends Pick<
    Prisma.AccessRoleFindManyArgs,
    "where" | "orderBy" | "skip" | "take"
  > {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetAccessRolesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: accessRoles,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.accessRole.count({ where }),
      query: (paginateArgs) =>
        db.accessRole.findMany({ ...paginateArgs, where, orderBy }),
    });

    return {
      accessRoles,
      nextPage,
      hasMore,
      count,
    };
  }
);
