import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { usePaginatedQuery } from "@blitzjs/rpc";
import { useRouter } from "next/router";
import Layout from "app/core/layouts/Layout";
import getAccessRolePolicies from "app/access-role-policies/queries/getAccessRolePolicies";

const ITEMS_PER_PAGE = 100;

export const AccessRolePoliciesList = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ accessRolePolicies, hasMore }] = usePaginatedQuery(
    getAccessRolePolicies,
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
        {accessRolePolicies.map((accessRolePolicy) => (
          <li key={accessRolePolicy.id}>
            <Link
              href={Routes.ShowAccessRolePolicyPage({
                accessRolePolicyId: accessRolePolicy.id,
              })}
            >
              <a>{accessRolePolicy.name}</a>
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

const AccessRolePoliciesPage = () => {
  return (
    <Layout>
      <Head>
        <title>AccessRolePolicies</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewAccessRolePolicyPage()}>
            <a>Create AccessRolePolicy</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <AccessRolePoliciesList />
        </Suspense>
      </div>
    </Layout>
  );
};

export default AccessRolePoliciesPage;
