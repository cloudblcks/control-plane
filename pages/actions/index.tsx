import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { usePaginatedQuery } from "@blitzjs/rpc";
import { useRouter } from "next/router";
import AuthorizedLayout from "app/core/layouts/AuthorizedLayout";
import getActions from "app/actions/queries/getActions";

const ITEMS_PER_PAGE = 100;

export const ActionsList = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ actions, hasMore }] = usePaginatedQuery(getActions, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
  const goToNextPage = () => router.push({ query: { page: page + 1 } });

  return (
    <div>
      <ul>
        {actions.map((action) => (
          <li key={action.id}>
            <Link href={Routes.ShowActionPage({ actionId: action.id })}>
              <a>{action.name}</a>
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

const ActionsPage = () => {
  return (
    <AuthorizedLayout>
      <Head>
        <title>Actions</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewActionPage()}>
            <a>Create Action</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ActionsList />
        </Suspense>
      </div>
    </AuthorizedLayout>
  );
};

export default ActionsPage;
