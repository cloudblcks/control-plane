import { Routes } from "@blitzjs/next";
import { useMutation } from "@blitzjs/rpc";
import { Box } from "@mantine/core";
import AuthorizedLayout from "app/core/layouts/AuthorizedLayout";
import {
  ProviderForm
} from "app/providers/components/ProviderForm";
import createProvider from "app/providers/mutations/createProvider";
import { useRouter } from "next/router";
import { Suspense } from "react";

const NewProvider = () => {
  const router = useRouter();
  const [createProviderMutation] = useMutation(createProvider);

  return (

    <ProviderForm
      submitLabel="Create Provider"
      initialValues={{
        name: "",
        category: ""
      }}
      onSubmit={async (values) => {
        try {
          const provider = await createProviderMutation(values);
          void router.push(Routes.ShowProviderPage({ providerId: provider.id }));
        } catch (error: any) {
          console.error(error);
          return {
            error
          };
        }
      }}
    />
  );
};


const NewProviderPage = () => {
  return (
    <AuthorizedLayout title="Add New Provider">
      <Box
        sx={(theme) => ({
          padding: theme.spacing.xl,
          borderRadius: theme.radius.md,
          backgroundColor: theme.white,
        })}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <NewProvider />
        </Suspense>
      </Box>

    </AuthorizedLayout >
  );
};

NewProviderPage.authenticate = true;


export default NewProviderPage;
