import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { usePaginatedQuery } from "@blitzjs/rpc";
import { useRouter } from "next/router";
import Layout from "app/core/layouts/Layout";
import getResources from "app/resources/queries/getResources";

const ITEMS_PER_PAGE = 100;

export const ResourcesList = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ resources, hasMore }] = usePaginatedQuery(getResources, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
  const goToNextPage = () => router.push({ query: { page: page + 1 } });

  return (
    <div>
      <ul>
        {resources.map((resource) => (
          <li key={resource.id}>
            <Link href={Routes.ShowResourcePage({ resourceId: resource.id })}>
              <a>{resource.name}</a>
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

const ResourcesPage = () => {
  return (
    <Layout>
      <Head>
        <title>Resources</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewResourcePage()}>
            <a>Create Resource</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ResourcesList />
        </Suspense>
      </div>
    </Layout>
  );
};

export default ResourcesPage;
