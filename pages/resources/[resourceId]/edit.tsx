import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation, usePaginatedQuery } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import AuthorizedLayout from "app/core/layouts/AuthorizedLayout";
import getResource from "app/resources/queries/getResource";
import updateResource from "app/resources/mutations/updateResource";
import {
  ResourceForm,
  FORM_ERROR,
} from "app/resources/components/ResourceForm";
import getProviderAccounts from "app/provider-accounts/queries/getProviderAccounts";
import { useCurrentUser } from "app/core/hooks/useCurrentUser";

const ITEMS_PER_PAGE = 100;

export const EditResource = () => {
  const router = useRouter();
  const resourceId = useParam("resourceId", "number");
  const [resource, { setQueryData }] = useQuery(
    getResource,
    { id: resourceId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  );
  const [updateResourceMutation] = useMutation(updateResource);
  const page = Number(router.query.page) || 0;
  const [{ providerAccounts, hasMore }] = usePaginatedQuery(getProviderAccounts, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });
  const currentUser = useCurrentUser()
  return (
    <>
      <Head>
        <title>Edit Resource {resource.id}</title>
      </Head>

      <div>
        <h1>Edit Resource {resource.id}</h1>
        <pre>{JSON.stringify(resource, null, 2)}</pre>

        <ResourceForm
          submitText="Update Resource"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateResource}
          initialValues={resource}
          options={providerAccounts.map((item) => {
            return { label: item.name, value: item.id.toString() }
          })}
          onSubmit={async (values) => {
            try {
              const updated = await updateResourceMutation({
                id: resource.id,
                name: values.name,
                provider_account_id: parseInt(values.provider_account_id),
                userId: currentUser!.id
              });
              await setQueryData(updated);
              void router.push(Routes.ShowResourcePage({ resourceId: updated.id }));
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

const EditResourcePage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditResource />
      </Suspense>

      <p>
        <Link href={Routes.ResourcesPage()}>
          <a>Resources</a>
        </Link>
      </p>
    </div>
  );
};

EditResourcePage.authenticate = true;
EditResourcePage.getLayout = (page) => <AuthorizedLayout>{page}</AuthorizedLayout>;

export default EditResourcePage;
