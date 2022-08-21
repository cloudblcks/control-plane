import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { usePaginatedQuery } from "@blitzjs/rpc";
import { useRouter } from "next/router";
import Layout from "app/core/layouts/Layout";
import getPolicyResources from "app/policy-resources/queries/getPolicyResources";

const ITEMS_PER_PAGE = 100;

export const PolicyResourcesList = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ policyResources, hasMore }] = usePaginatedQuery(getPolicyResources, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
  const goToNextPage = () => router.push({ query: { page: page + 1 } });

  return (
    <div>
      <ul>
        {policyResources.map((policyResource) => (
          <li key={policyResource.id}>
            <Link
              href={Routes.ShowPolicyResourcePage({
                policyResourceId: policyResource.id,
              })}
            >
              <a>{policyResource.name}</a>
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

const PolicyResourcesPage = () => {
  return (
    <Layout>
      <Head>
        <title>PolicyResources</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewPolicyResourcePage()}>
            <a>Create PolicyResource</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <PolicyResourcesList />
        </Suspense>
      </div>
    </Layout>
  );
};

export default PolicyResourcesPage;