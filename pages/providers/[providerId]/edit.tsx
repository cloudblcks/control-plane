import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import Layout from "app/core/layouts/Layout";
import getProvider from "app/providers/queries/getProvider";
import updateProvider from "app/providers/mutations/updateProvider";
import {
  ProviderForm,
  FORM_ERROR,
} from "app/providers/components/ProviderForm";

export const EditProvider = () => {
  const router = useRouter();
  const providerId = useParam("providerId", "number");
  const [provider, { setQueryData }] = useQuery(
    getProvider,
    { id: providerId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  );
  const [updateProviderMutation] = useMutation(updateProvider);

  return (
    <>
      <Head>
        <title>Edit Provider {provider.id}</title>
      </Head>

      <div>
        <h1>Edit Provider {provider.id}</h1>
        <pre>{JSON.stringify(provider, null, 2)}</pre>

        <ProviderForm
          submitText="Update Provider"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateProvider}
          initialValues={provider}
          onSubmit={async (values) => {
            try {
              const updated = await updateProviderMutation({
                id: provider.id,
                ...values,
              });
              await setQueryData(updated);
              void router.push(Routes.ShowProviderPage({ providerId: updated.id }));
            } catch (error: any) {
              console.error(error);
              return {
                [FORM_ERROR]: error.toString(),
              };
            }
          }}
        />
      </div>
    </>
  );
};

const EditProviderPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditProvider />
      </Suspense>

      <p>
        <Link href={Routes.ProvidersPage()}>
          <a>Providers</a>
        </Link>
      </p>
    </div>
  );
};

EditProviderPage.authenticate = true;
EditProviderPage.getLayout = (page) => <Layout>{page}</Layout>;

export default EditProviderPage;
