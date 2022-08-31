import { Routes, useParam } from "@blitzjs/next";
import { useMutation, useQuery } from "@blitzjs/rpc";
import Head from "next/head";
import { useRouter } from "next/router";
import { startTransition, Suspense, useState } from "react";

import { Box } from "@mantine/core";
import AuthorizedLayout from "app/core/layouts/AuthorizedLayout";
import {
  ProviderForm
} from "app/providers/components/ProviderForm";
import updateProvider from "app/providers/mutations/updateProvider";
import getProvider from "app/providers/queries/getProvider";

interface ProviderInfo { id: number, name: string }

export const EditProvider = (props: { onProviderLoad: (ProviderInfo) => void }) => {
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
  if (provider) {
    props.onProviderLoad(provider);
  }
  const [updateProviderMutation] = useMutation(updateProvider);

  return (
    <>
      <Head>
        <title>Edit Provider {provider.id}</title>
      </Head>

      <div>
        <ProviderForm
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateProvider}
          initialValues={provider}
          submitLabel="Update Provider"
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
                error
              };
            }
          }}
        />
      </div>
    </>
  );
};

const EditProviderPage = () => {
  const [providerInfo, setProviderInfo] = useState<ProviderInfo | undefined>(undefined);

  const onProviderInfoChange = (providerInfo: ProviderInfo) => {
    startTransition(() => {
      setProviderInfo(providerInfo)
    })
  }
  return (
    <AuthorizedLayout title={"Edit Provider" + (providerInfo ? providerInfo.name : "")}>
      <Box
        sx={(theme) => ({
          padding: theme.spacing.xl,
          borderRadius: theme.radius.md,
          backgroundColor: theme.white,
        })}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <EditProvider onProviderLoad={onProviderInfoChange} />
        </Suspense>
      </Box>
    </AuthorizedLayout >
  );
};

EditProviderPage.authenticate = true;

export default EditProviderPage;
