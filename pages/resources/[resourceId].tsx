import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import Layout from "app/core/layouts/Layout";
import getResource from "app/resources/queries/getResource";
import deleteResource from "app/resources/mutations/deleteResource";

export const Resource = () => {
  const router = useRouter();
  const resourceId = useParam("resourceId", "number");
  const [deleteResourceMutation] = useMutation(deleteResource);
  const [resource] = useQuery(getResource, { id: resourceId });

  return (
    <>
      <Head>
        <title>Resource {resource.id}</title>
      </Head>

      <div>
        <h1>Resource {resource.id}</h1>
        <pre>{JSON.stringify(resource, null, 2)}</pre>

        <Link href={Routes.EditResourcePage({ resourceId: resource.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteResourceMutation({ id: resource.id });
              void router.push(Routes.ResourcesPage());
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  );
};

const ShowResourcePage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.ResourcesPage()}>
          <a>Resources</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Resource />
      </Suspense>
    </div>
  );
};

ShowResourcePage.authenticate = true;
ShowResourcePage.getLayout = (page) => <Layout>{page}</Layout>;

export default ShowResourcePage;
