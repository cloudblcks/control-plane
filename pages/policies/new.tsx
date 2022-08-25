import { Routes } from "@blitzjs/next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation, usePaginatedQuery, useQuery } from "@blitzjs/rpc";
import Layout from "app/core/layouts/Layout";
import createPolicy from "app/policies/mutations/createPolicy";
import { PolicyForm, FORM_ERROR } from "app/policies/components/PolicyForm";
import getProviders from "app/providers/queries/getProviders";
import { useCurrentUser } from "app/core/hooks/useCurrentUser";
import getProviderAccounts from "app/provider-accounts/queries/getProviderAccounts";
import { Suspense, useState, useTransition } from "react";

const ITEMS_PER_PAGE = 100;

const NewPolicy = () => {
  const router = useRouter();
  const [createPolicyMutation] = useMutation(createPolicy);
  const page = Number(router.query.page) || 0;
  const [{ providerAccounts, hasMore }] = usePaginatedQuery(getProviderAccounts, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });
  const [selectedActions, setSelectedActions] = useState(Array<number>())
  const [isPending, startTransition] = useTransition();

  const onSelectedActionsListChange = (selected: Array<number>) => {
    startTransition(() => {
      setSelectedActions(selected)
    })
  }

  return (
    <>
      <h1>Create New Policy</h1>

      <PolicyForm
        submitText="Create Policy"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreatePolicy}
        // initialValues={{}}
        options={providerAccounts.map((item) => {
          return { label: item.name, value: item.id.toString() }
        })}

        onActionsListChange={onSelectedActionsListChange}
        onSubmit={async (values) => {
          try {
            console.log(values)
            console.log(selectedActions)


            const policy = await createPolicyMutation({
              name: values.name,
              provider_account_id: parseInt(values.provider_account_id),
              resource_id: parseInt(values.resource_id),
              action_ids: selectedActions
            });
            void router.push(Routes.ShowPolicyPage({ policyId: policy.id }));
          } catch (error: any) {
            console.error(error);
            return {
              [FORM_ERROR]: error.toString(),
            };
          }
        }}
      />


    </>
  );
};

const NewPolicyPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <NewPolicy />
      </Suspense>

      <p>
        <Link href={Routes.PoliciesPage()}>
          <a>Policies</a>
        </Link>
      </p>
    </div>
  );
};

NewPolicyPage.authenticate = true;
NewPolicyPage.getLayout = (page) => <Layout>{page}</Layout>;


export default NewPolicyPage;
