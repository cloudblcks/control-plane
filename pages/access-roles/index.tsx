import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { usePaginatedQuery } from "@blitzjs/rpc";
import { useRouter } from "next/router";
import AuthorizedLayout from "app/core/layouts/AuthorizedLayout";
import getAccessRoles from "app/access-roles/queries/getAccessRoles";

const ITEMS_PER_PAGE = 100;

export const AccessRolesList = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ accessRoles, hasMore }] = usePaginatedQuery(getAccessRoles, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
  const goToNextPage = () => router.push({ query: { page: page + 1 } });

  return (
    <div>
      <ul>
        {accessRoles.map((accessRole) => (
          <li key={accessRole.id}>
            <Link
              href={Routes.ShowAccessRolePage({ accessRoleId: accessRole.id })}
            >
              <a>{accessRole.name}</a>
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

const AccessRolesPage = () => {
  return (
    <AuthorizedLayout>
      <Head>
        <title>AccessRoles</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewAccessRolePage()}>
            <a>Create AccessRole</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <AccessRolesList />
        </Suspense>
      </div>
    </AuthorizedLayout>
  );
};

export default AccessRolesPage;
