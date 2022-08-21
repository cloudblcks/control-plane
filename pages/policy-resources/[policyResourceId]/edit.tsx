import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import Layout from "app/core/layouts/Layout";
import getPolicyResource from "app/policy-resources/queries/getPolicyResource";
import updatePolicyResource from "app/policy-resources/mutations/updatePolicyResource";
import {
  PolicyResourceForm,
  FORM_ERROR,
} from "app/policy-resources/components/PolicyResourceForm";

export const EditPolicyResource = () => {
  const router = useRouter();
  const policyResourceId = useParam("policyResourceId", "number");
  const [policyResource, { setQueryData }] = useQuery(
    getPolicyResource,
    { id: policyResourceId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  );
  const [updatePolicyResourceMutation] = useMutation(updatePolicyResource);

  return (
    <>
      <Head>
        <title>Edit PolicyResource {policyResource.id}</title>
      </Head>

      <div>
        <h1>Edit PolicyResource {policyResource.id}</h1>
        <pre>{JSON.stringify(policyResource, null, 2)}</pre>

        <PolicyResourceForm
          submitText="Update PolicyResource"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdatePolicyResource}
          initialValues={policyResource}
          onSubmit={async (values) => {
            try {
              const updated = await updatePolicyResourceMutation({
                id: policyResource.id,
                ...values,
              });
              await setQueryData(updated);
              router.push(
                Routes.ShowPolicyResourcePage({ policyResourceId: updated.id })
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

const EditPolicyResourcePage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditPolicyResource />
      </Suspense>

      <p>
        <Link href={Routes.PolicyResourcesPage()}>
          <a>PolicyResources</a>
        </Link>
      </p>
    </div>
  );
};

EditPolicyResourcePage.authenticate = true;
EditPolicyResourcePage.getLayout = (page) => <Layout>{page}</Layout>;

export default EditPolicyResourcePage;
