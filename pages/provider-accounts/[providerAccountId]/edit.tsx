import { Routes, useParam } from "@blitzjs/next";
import { useMutation, usePaginatedQuery, useQuery } from "@blitzjs/rpc";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Suspense } from "react";

import { useCurrentUser } from "app/core/hooks/useCurrentUser";
import AuthorizedLayout from "app/core/layouts/AuthorizedLayout";
import {
  ProviderAccountForm
} from "app/provider-accounts/components/ProviderAccountForm";
import updateProviderAccount from "app/provider-accounts/mutations/updateProviderAccount";
import getProviderAccount from "app/provider-accounts/queries/getProviderAccount";
import getProviders from "app/providers/queries/getProviders";

const ITEMS_PER_PAGE = 100;

export const EditProviderAccount = () => {

  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const providerAccountId = useParam("providerAccountId", "number");
  const [providerAccount, { setQueryData }] = useQuery(
    getProviderAccount,
    { id: providerAccountId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  );
  providerAccount
  const [updateProviderAccountMutation] = useMutation(updateProviderAccount);
  const [{ providers, hasMore }] = usePaginatedQuery(getProviders, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });
  const currentUser = useCurrentUser()
  if (currentUser) {
    return (
      <>
        <Head>
          <title>Edit ProviderAccount {providerAccount.id}</title>
        </Head>

        <div>
          <h1>Edit ProviderAccount {providerAccount.id}</h1>
          <pre>{JSON.stringify(providerAccount, null, 2)}</pre>

          <ProviderAccountForm
            submitLabel="Update ProviderAccount"
            // TODO use a zod schema for form validation
            //  - Tip: extract mutation's schema into a shared `validations.ts` file and
            //         then import and use it here
            // schema={UpdateProviderAccount}
            // initialValues={providerAccount}
            options={providers.map((item) => {
              return { label: item.name, value: item.id.toString() }
            })}
            onSubmit={async (values) => {
              try {
                const updated = await updateProviderAccountMutation({
                  id: providerAccount.id,
                  name: values.name,
                  provider: parseInt(values.provider_id),
                  user: currentUser.id,
                  credentials: values.credentials
                });
                await setQueryData(updated);
                void router.push(
                  Routes.ShowProviderAccountPage({
                    providerAccountId: updated.id,
                  })
                );
              } catch (error: any) {
                console.error(error);
                return error;
              }
            }}
          />
        </div>
      </>
    );
  } else {
    return <></>
  }
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
EditProviderAccountPage.getLayout = (page) => <AuthorizedLayout>{page}</AuthorizedLayout>;

export default EditProviderAccountPage;

