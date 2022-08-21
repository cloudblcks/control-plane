import { Routes } from "@blitzjs/next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@blitzjs/rpc";
import Layout from "app/core/layouts/Layout";
import createPolicyAction from "app/policy-actions/mutations/createPolicyAction";
import {
  PolicyActionForm,
  FORM_ERROR,
} from "app/policy-actions/components/PolicyActionForm";

const NewPolicyActionPage = () => {
  const router = useRouter();
  const [createPolicyActionMutation] = useMutation(createPolicyAction);

  return (
    <Layout title={"Create New PolicyAction"}>
      <h1>Create New PolicyAction</h1>

      <PolicyActionForm
        submitText="Create PolicyAction"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreatePolicyAction}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const policyAction = await createPolicyActionMutation(values);
            router.push(
              Routes.ShowPolicyActionPage({ policyActionId: policyAction.id })
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
        <Link href={Routes.PolicyActionsPage()}>
          <a>PolicyActions</a>
        </Link>
      </p>
    </Layout>
  );
};

NewPolicyActionPage.authenticate = true;

export default NewPolicyActionPage;
