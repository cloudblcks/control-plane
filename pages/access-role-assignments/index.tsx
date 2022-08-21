import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { usePaginatedQuery } from "@blitzjs/rpc";
import { useRouter } from "next/router";
import Layout from "app/core/layouts/Layout";
import getAccessRoleAssignments from "app/access-role-assignments/queries/getAccessRoleAssignments";

const ITEMS_PER_PAGE = 100;

export const AccessRoleAssignmentsList = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ accessRoleAssignments, hasMore }] = usePaginatedQuery(
    getAccessRoleAssignments,
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
        {accessRoleAssignments.map((accessRoleAssignment) => (
          <li key={accessRoleAssignment.id}>
            <Link
              href={Routes.ShowAccessRoleAssignmentPage({
                accessRoleAssignmentId: accessRoleAssignment.id,
              })}
            >
              <a>{accessRoleAssignment.name}</a>
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

const AccessRoleAssignmentsPage = () => {
  return (
    <Layout>
      <Head>
        <title>AccessRoleAssignments</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewAccessRoleAssignmentPage()}>
            <a>Create AccessRoleAssignment</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <AccessRoleAssignmentsList />
        </Suspense>
      </div>
    </Layout>
  );
};

export default AccessRoleAssignmentsPage;
