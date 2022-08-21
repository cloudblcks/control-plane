import { Routes } from "@blitzjs/next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@blitzjs/rpc";
import Layout from "app/core/layouts/Layout";
import createPolicy from "app/policies/mutations/createPolicy";
import { PolicyForm, FORM_ERROR } from "app/policies/components/PolicyForm";

const NewPolicyPage = () => {
  const router = useRouter();
  const [createPolicyMutation] = useMutation(createPolicy);

  return (
    <Layout title={"Create New Policy"}>
      <h1>Create New Policy</h1>

      <PolicyForm
        submitText="Create Policy"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreatePolicy}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const policy = await createPolicyMutation(values);
            router.push(Routes.ShowPolicyPage({ policyId: policy.id }));
          } catch (error: any) {
            console.error(error);
            return {
              [FORM_ERROR]: error.toString(),
            };
          }
        }}
      />

      <p>
        <Link href={Routes.PoliciesPage()}>
          <a>Policies</a>
        </Link>
      </p>
    </Layout>
  );
};

NewPolicyPage.authenticate = true;

export default NewPolicyPage;
