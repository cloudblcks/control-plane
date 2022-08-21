import { Routes } from "@blitzjs/next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@blitzjs/rpc";
import Layout from "app/core/layouts/Layout";
import createPolicyResource from "app/policy-resources/mutations/createPolicyResource";
import {
  PolicyResourceForm,
  FORM_ERROR,
} from "app/policy-resources/components/PolicyResourceForm";

const NewPolicyResourcePage = () => {
  const router = useRouter();
  const [createPolicyResourceMutation] = useMutation(createPolicyResource);

  return (
    <Layout title={"Create New PolicyResource"}>
      <h1>Create New PolicyResource</h1>

      <PolicyResourceForm
        submitText="Create PolicyResource"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreatePolicyResource}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const policyResource = await createPolicyResourceMutation(values);
            router.push(
              Routes.ShowPolicyResourcePage({
                policyResourceId: policyResource.id,
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
        <Link href={Routes.PolicyResourcesPage()}>
          <a>PolicyResources</a>
        </Link>
      </p>
    </Layout>
  );
};

NewPolicyResourcePage.authenticate = true;

export default NewPolicyResourcePage;
