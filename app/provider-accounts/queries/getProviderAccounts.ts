import { resolver } from "@blitzjs/rpc";
import { paginate } from "blitz";
import db, { Prisma } from "db";

interface GetProviderAccountsInput
  extends Pick<
    Prisma.ProviderAccountFindManyArgs,
    "where" | "orderBy" | "skip" | "take"
  > {}

export default resolver.pipe(
  resolver.authorize(),
  async ({
    where,
    orderBy,
    skip = 0,
    take = 100,
  }: GetProviderAccountsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: providerAccounts,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.providerAccount.count({ where }),
      query: (paginateArgs) =>
        db.providerAccount.findMany({
          ...paginateArgs,
          where,
          orderBy,
          include: { provider: true },
        }),
    });

    return {
      providerAccounts,
      nextPage,
      hasMore,
      count,
    };
  }
);
