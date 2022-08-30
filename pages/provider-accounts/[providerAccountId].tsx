import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import AuthorizedLayout from "app/core/layouts/AuthorizedLayout";
import getProviderAccount from "app/provider-accounts/queries/getProviderAccount";
import deleteProviderAccount from "app/provider-accounts/mutations/deleteProviderAccount";

export const ProviderAccount = () => {
  const router = useRouter();
  const providerAccountId = useParam("providerAccountId", "number");
  const [deleteProviderAccountMutation] = useMutation(deleteProviderAccount);
  const [providerAccount] = useQuery(getProviderAccount, {
    id: providerAccountId,
  });

  return (
    <>
      <Head>
        <title>ProviderAccount {providerAccount.id}</title>
      </Head>

      <div>
        <h1>ProviderAccount {providerAccount.id}</h1>
        <pre>{JSON.stringify(providerAccount, null, 2)}</pre>

        <Link
          href={Routes.EditProviderAccountPage({
            providerAccountId: providerAccount.id,
          })}
        >
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteProviderAccountMutation({ id: providerAccount.id });
              void router.push(Routes.ProviderAccountsPage());
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

const ShowProviderAccountPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.ProviderAccountsPage()}>
          <a>ProviderAccounts</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <ProviderAccount />
      </Suspense>
    </div>
  );
};

ShowProviderAccountPage.authenticate = true;
ShowProviderAccountPage.getLayout = (page) => <AuthorizedLayout>{page}</AuthorizedLayout>;

export default ShowProviderAccountPage;
