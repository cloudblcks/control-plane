import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import Layout from "app/core/layouts/Layout";
import getProviderAccount from "app/provider-accounts/queries/getProviderAccount";
import updateProviderAccount from "app/provider-accounts/mutations/updateProviderAccount";
import {
  ProviderAccountForm,
  FORM_ERROR,
} from "app/provider-accounts/components/ProviderAccountForm";

export const EditProviderAccount = () => {
  const router = useRouter();
  const providerAccountId = useParam("providerAccountId", "number");
  const [providerAccount, { setQueryData }] = useQuery(
    getProviderAccount,
    { id: providerAccountId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  );
  const [updateProviderAccountMutation] = useMutation(updateProviderAccount);

  return (
    <>
      <Head>
        <title>Edit ProviderAccount {providerAccount.id}</title>
      </Head>

      <div>
        <h1>Edit ProviderAccount {providerAccount.id}</h1>
        <pre>{JSON.stringify(providerAccount, null, 2)}</pre>

        <ProviderAccountForm
          submitText="Update ProviderAccount"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateProviderAccount}
          initialValues={providerAccount}
          onSubmit={async (values) => {
            try {
              const updated = await updateProviderAccountMutation({
                id: providerAccount.id,
                ...values,
              });
              await setQueryData(updated);
              router.push(
                Routes.ShowProviderAccountPage({
                  providerAccountId: updated.id,
                })
              );
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

const EditProviderAccountPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditProviderAccount />
      </Suspense>

      <p>
        <Link href={Routes.ProviderAccountsPage()}>
          <a>ProviderAccounts</a>
        </Link>
      </p>
    </div>
  );
};

EditProviderAccountPage.authenticate = true;
EditProviderAccountPage.getLayout = (page) => <Layout>{page}</Layout>;

export default EditProviderAccountPage;
