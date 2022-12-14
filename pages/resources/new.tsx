import { Routes } from "@blitzjs/next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation, usePaginatedQuery } from "@blitzjs/rpc";
import AuthorizedLayout from "app/core/layouts/AuthorizedLayout";
import createResource from "app/resources/mutations/createResource";
import {
  ResourceForm,
  FORM_ERROR,
} from "app/resources/components/ResourceForm";
import getProviderAccounts from "app/provider-accounts/queries/getProviderAccounts";
import { useCurrentUser } from "app/core/hooks/useCurrentUser";
import { Suspense } from "react";

const ITEMS_PER_PAGE = 100;

const NewResource = () => {
  const router = useRouter();
  const [createResourceMutation] = useMutation(createResource);
  const page = Number(router.query.page) || 0;
  const [{ providerAccounts, hasMore }] = usePaginatedQuery(getProviderAccounts, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });
  const currentUser = useCurrentUser()
  return (
    <>
      <h1>Create New Resource</h1>

      <ResourceForm
        submitText="Create Resource"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateResource}
        // initialValues={{}}
        options={providerAccounts.map((item) => {
          return { label: item.name, value: item.id.toString() }
        })}
        onSubmit={async (values) => {
          try {
            const resource = await createResourceMutation({
              name: values.name,
              provider_account_id: parseInt(values.provider_account_id)
            });
            void router.push(Routes.ShowResourcePage({ resourceId: resource.id }));
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



const NewResourcePage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <NewResource />
      </Suspense>

      <p>
        <Link href={Routes.ResourcesPage()}>
          <a>Resources</a>
        </Link>
      </p>
    </div>
  );
};

NewResourcePage.authenticate = true;
NewResourcePage.getLayout = (page) => <AuthorizedLayout>{page}</AuthorizedLayout>;


export default NewResourcePage;
