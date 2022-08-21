import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { usePaginatedQuery } from "@blitzjs/rpc";
import { useRouter } from "next/router";
import Layout from "app/core/layouts/Layout";
import getPolicies from "app/policies/queries/getPolicies";

const ITEMS_PER_PAGE = 100;

export const PoliciesList = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ policies, hasMore }] = usePaginatedQuery(getPolicies, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
  const goToNextPage = () => router.push({ query: { page: page + 1 } });

  return (
    <div>
      <ul>
        {policies.map((policy) => (
          <li key={policy.id}>
            <Link href={Routes.ShowPolicyPage({ policyId: policy.id })}>
              <a>{policy.name}</a>
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

const PoliciesPage = () => {
  return (
    <Layout>
      <Head>
        <title>Policies</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewPolicyPage()}>
            <a>Create Policy</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <PoliciesList />
        </Suspense>
      </div>
    </Layout>
  );
};

export default PoliciesPage;
