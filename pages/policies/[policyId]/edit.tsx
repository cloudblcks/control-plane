import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import AuthorizedLayout from "app/core/layouts/AuthorizedLayout";
import getPolicy from "app/policies/queries/getPolicy";
import updatePolicy from "app/policies/mutations/updatePolicy";
import { PolicyForm, FORM_ERROR } from "app/policies/components/PolicyForm";

export const EditPolicy = () => {
  const router = useRouter();
  const policyId = useParam("policyId", "number");
  const [policy, { setQueryData }] = useQuery(
    getPolicy,
    { id: policyId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  );
  const [updatePolicyMutation] = useMutation(updatePolicy);

  return (
    <>
      <Head>
        <title>Edit Policy {policy.id}</title>
      </Head>

      <div>
        <h1>Edit Policy {policy.id}</h1>
        <pre>{JSON.stringify(policy, null, 2)}</pre>

        {/* <PolicyForm
          submitText="Update Policy"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdatePolicy}
          initialValues={policy}
          onSubmit={async (values) => {
            try {
              const updated = await updatePolicyMutation({
                id: policy.id,
                ...values,
              });
              await setQueryData(updated);
              void router.push(Routes.ShowPolicyPage({ policyId: updated.id }));
            } catch (error: any) {
              console.error(error);
              return {
                [FORM_ERROR]: error.toString(),
              };
            }
          }}
        /> */}
      </div>
    </>
  );
};

const EditPolicyPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditPolicy />
      </Suspense>

      <p>
        <Link href={Routes.PoliciesPage()}>
          <a>Policies</a>
        </Link>
      </p>
    </div>
  );
};

EditPolicyPage.authenticate = true;
EditPolicyPage.getLayout = (page) => <AuthorizedLayout>{page}</AuthorizedLayout>;

export default EditPolicyPage;
