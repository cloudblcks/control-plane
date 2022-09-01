import { Routes } from "@blitzjs/next";
import { useMutation, useQuery } from "@blitzjs/rpc";
import { Box, Center, Text } from "@mantine/core";
import { useCurrentUser } from "app/core/hooks/useCurrentUser";
import AuthorizedLayout from "app/core/layouts/AuthorizedLayout";
import { ProviderAccountForm } from "app/provider-accounts/components/ProviderAccountForm";
import createProviderAccount from "app/provider-accounts/mutations/createProviderAccount";
import getProviders from "app/providers/queries/getProviders";
import { useRouter } from "next/router";
import { Suspense } from "react";


const NewProviderAccount = () => {

  const router = useRouter();
  const [createProviderAccountMutation] = useMutation(createProviderAccount);
  const [{ providers }] = useQuery(getProviders, {
    orderBy: { id: "asc" }
  });
  const currentUser = useCurrentUser()

  return (
    <ProviderAccountForm
      submitLabel="Connect Account"
      options={providers.map((item) => {
        return { label: item.name, value: item.id.toString() }
      })}
      onSubmit={async (values) => {
        try {
          const providerAccount = await createProviderAccountMutation({
            name: values.name,
            provider: parseInt(values.provider_id),
            user: currentUser!.id,
            credentials: values.credentials
          });
          void router.push(
            Routes.ShowProviderAccountPage({
              providerAccountId: providerAccount.id,
            })
          );
        } catch (error: any) {
          console.error(error);
          return error;
        }
      }}
    />


  );

};


const NewProviderAccountPage = () => {
  return (
    <AuthorizedLayout title="Connect New Provider Account">
      <Box
        sx={(theme) => ({
          padding: theme.spacing.xl,
          borderRadius: theme.radius.md,
          backgroundColor: theme.white,
        })}
      >
        <Suspense fallback={<Center><Text>Loading...</Text></Center>}>
          <NewProviderAccount />
        </Suspense>
      </Box>
    </AuthorizedLayout>
  );
};

NewProviderAccountPage.authenticate = true;


export default NewProviderAccountPage;
