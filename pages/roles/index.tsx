import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { usePaginatedQuery } from "@blitzjs/rpc";
import { useRouter } from "next/router";
import Layout from "app/core/layouts/Layout";
import getRoles from "app/roles/queries/getRoles";

const ITEMS_PER_PAGE = 100;

export const RolesList = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ roles, hasMore }] = usePaginatedQuery(getRoles, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
  const goToNextPage = () => router.push({ query: { page: page + 1 } });

  return (
    <div>
      <ul>
        {roles.map((role) => (
          <li key={role.id}>
            <Link href={Routes.ShowRolePage({ roleId: role.id })}>
              <a>{role.name}</a>
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

const RolesPage = () => {
  return (
    <Layout>
      <Head>
        <title>Roles</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewRolePage()}>
            <a>Create Role</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <RolesList />
        </Suspense>
      </div>
    </Layout>
  );
};

export default RolesPage;
