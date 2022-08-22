import { Routes } from "@blitzjs/next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation, usePaginatedQuery } from "@blitzjs/rpc";
import Layout from "app/core/layouts/Layout";
import createProviderAccount from "app/provider-accounts/mutations/createProviderAccount";
import {
  ProviderAccountForm,
  FORM_ERROR,
} from "app/provider-accounts/components/ProviderAccountForm";
import getProviders from "app/providers/queries/getProviders";
import { useCurrentUser } from "app/core/hooks/useCurrentUser";

const ITEMS_PER_PAGE = 100;

const NewProviderAccountPage = () => {

  const router = useRouter();
  const [createProviderAccountMutation] = useMutation(createProviderAccount);
  const page = Number(router.query.page) || 0;
  const [{ providers, hasMore }] = usePaginatedQuery(getProviders, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });
  const currentUser = useCurrentUser()
  if (currentUser) {
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
          options={providers.map((item) => {
            return { label: item.name, value: item.id.toString() }
          })}
          onSubmit={async (values) => {
            try {
              const providerAccount = await createProviderAccountMutation({
                name: values.name,
                provider: parseInt(values.provider_id),
                user: currentUser.id,
                credentials: values.credentials
              });
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
  } else {
    return <> </>
  }
};

NewProviderAccountPage.authenticate = true;

export default NewProviderAccountPage;
function LabeledSelectOption(name: string, id: number): any {
  throw new Error("Function not implemented.");
}

