import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { usePaginatedQuery } from "@blitzjs/rpc";
import { useRouter } from "next/router";
import Layout from "app/core/layouts/Layout";
import getProviders from "app/providers/queries/getProviders";

const ITEMS_PER_PAGE = 100;

export const ProvidersList = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ providers, hasMore }] = usePaginatedQuery(getProviders, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
  const goToNextPage = () => router.push({ query: { page: page + 1 } });

  return (
    <div>
      <ul>
        {providers.map((provider) => (
          <li key={provider.id}>
            <Link href={Routes.ShowProviderPage({ providerId: provider.id })}>
              <a>{provider.name}</a>
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

const ProvidersPage = () => {
  return (
    <Layout>
      <Head>
        <title>Providers</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewProviderPage()}>
            <a>Create Provider</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ProvidersList />
        </Suspense>
      </div>
    </Layout>
  );
};

export default ProvidersPage;
