import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import Layout from "app/core/layouts/Layout";
import getProvider from "app/providers/queries/getProvider";
import deleteProvider from "app/providers/mutations/deleteProvider";

export const Provider = () => {
  const router = useRouter();
  const providerId = useParam("providerId", "number");
  const [deleteProviderMutation] = useMutation(deleteProvider);
  const [provider] = useQuery(getProvider, { id: providerId });

  return (
    <>
      <Head>
        <title>Provider {provider.id}</title>
      </Head>

      <div>
        <h1>Provider {provider.id}</h1>
        <pre>{JSON.stringify(provider, null, 2)}</pre>

        <Link href={Routes.EditProviderPage({ providerId: provider.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteProviderMutation({ id: provider.id });
              router.push(Routes.ProvidersPage());
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

const ShowProviderPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.ProvidersPage()}>
          <a>Providers</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Provider />
      </Suspense>
    </div>
  );
};

ShowProviderPage.authenticate = true;
ShowProviderPage.getLayout = (page) => <Layout>{page}</Layout>;

export default ShowProviderPage;
