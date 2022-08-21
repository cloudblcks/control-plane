import { paginate } from "blitz";
import { resolver } from "@blitzjs/rpc";
import db, { Prisma } from "db";

interface GetAccessRoleAssignmentsInput
  extends Pick<
    Prisma.AccessRoleAssignmentFindManyArgs,
    "where" | "orderBy" | "skip" | "take"
  > {}

export default resolver.pipe(
  resolver.authorize(),
  async ({
    where,
    orderBy,
    skip = 0,
    take = 100,
  }: GetAccessRoleAssignmentsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: accessRoleAssignments,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.accessRoleAssignment.count({ where }),
      query: (paginateArgs) =>
        db.accessRoleAssignment.findMany({ ...paginateArgs, where, orderBy }),
    });

    return {
      accessRoleAssignments,
      nextPage,
      hasMore,
      count,
    };
  }
);
