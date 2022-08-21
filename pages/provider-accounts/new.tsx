import { Routes } from "@blitzjs/next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@blitzjs/rpc";
import Layout from "app/core/layouts/Layout";
import createProviderAccount from "app/provider-accounts/mutations/createProviderAccount";
import {
  ProviderAccountForm,
  FORM_ERROR,
} from "app/provider-accounts/components/ProviderAccountForm";

const NewProviderAccountPage = () => {
  const router = useRouter();
  const [createProviderAccountMutation] = useMutation(createProviderAccount);

  return (
    <Layout title={"Create New ProviderAccount"}>
      <h1>Create New ProviderAccount</h1>

      <ProviderAccountForm
        submitText="Create ProviderAccount"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateProviderAccount}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const providerAccount = await createProviderAccountMutation(values);
            router.push(
              Routes.ShowProviderAccountPage({
                providerAccountId: providerAccount.id,
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

      <p>
        <Link href={Routes.ProviderAccountsPage()}>
          <a>ProviderAccounts</a>
        </Link>
      </p>
    </Layout>
  );
};

NewProviderAccountPage.authenticate = true;

export default NewProviderAccountPage;
