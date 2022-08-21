import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import Layout from "app/core/layouts/Layout";
import getPolicyAction from "app/policy-actions/queries/getPolicyAction";
import updatePolicyAction from "app/policy-actions/mutations/updatePolicyAction";
import {
  PolicyActionForm,
  FORM_ERROR,
} from "app/policy-actions/components/PolicyActionForm";

export const EditPolicyAction = () => {
  const router = useRouter();
  const policyActionId = useParam("policyActionId", "number");
  const [policyAction, { setQueryData }] = useQuery(
    getPolicyAction,
    { id: policyActionId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  );
  const [updatePolicyActionMutation] = useMutation(updatePolicyAction);

  return (
    <>
      <Head>
        <title>Edit PolicyAction {policyAction.id}</title>
      </Head>

      <div>
        <h1>Edit PolicyAction {policyAction.id}</h1>
        <pre>{JSON.stringify(policyAction, null, 2)}</pre>

        <PolicyActionForm
          submitText="Update PolicyAction"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdatePolicyAction}
          initialValues={policyAction}
          onSubmit={async (values) => {
            try {
              const updated = await updatePolicyActionMutation({
                id: policyAction.id,
                ...values,
              });
              await setQueryData(updated);
              router.push(
                Routes.ShowPolicyActionPage({ policyActionId: updated.id })
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

const EditPolicyActionPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditPolicyAction />
      </Suspense>

      <p>
        <Link href={Routes.PolicyActionsPage()}>
          <a>PolicyActions</a>
        </Link>
      </p>
    </div>
  );
};

EditPolicyActionPage.authenticate = true;
EditPolicyActionPage.getLayout = (page) => <Layout>{page}</Layout>;

export default EditPolicyActionPage;
