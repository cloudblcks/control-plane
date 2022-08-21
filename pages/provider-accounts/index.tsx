import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { usePaginatedQuery } from "@blitzjs/rpc";
import { useRouter } from "next/router";
import Layout from "app/core/layouts/Layout";
import getProviderAccounts from "app/provider-accounts/queries/getProviderAccounts";

const ITEMS_PER_PAGE = 100;

export const ProviderAccountsList = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ providerAccounts, hasMore }] = usePaginatedQuery(
    getProviderAccounts,
    {
      orderBy: { id: "asc" },
      skip: ITEMS_PER_PAGE * page,
      take: ITEMS_PER_PAGE,
    }
  );

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
  const goToNextPage = () => router.push({ query: { page: page + 1 } });

  return (
    <div>
      <ul>
        {providerAccounts.map((providerAccount) => (
          <li key={providerAccount.id}>
            <Link
              href={Routes.ShowProviderAccountPage({
                providerAccountId: providerAccount.id,
              })}
            >
              <a>{providerAccount.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  );
};

const ProviderAccountsPage = () => {
  return (
    <Layout>
      <Head>
        <title>ProviderAccounts</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewProviderAccountPage()}>
            <a>Create ProviderAccount</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ProviderAccountsList />
        </Suspense>
      </div>
    </Layout>
  );
};

export default ProviderAccountsPage;
