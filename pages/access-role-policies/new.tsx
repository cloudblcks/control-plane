import { Routes } from "@blitzjs/next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@blitzjs/rpc";
import Layout from "app/core/layouts/Layout";
import createAccessRolePolicy from "app/access-role-policies/mutations/createAccessRolePolicy";
import {
  AccessRolePolicyForm,
  FORM_ERROR,
} from "app/access-role-policies/components/AccessRolePolicyForm";

const NewAccessRolePolicyPage = () => {
  const router = useRouter();
  const [createAccessRolePolicyMutation] = useMutation(createAccessRolePolicy);

  return (
    <Layout title={"Create New AccessRolePolicy"}>
      <h1>Create New AccessRolePolicy</h1>

      <AccessRolePolicyForm
        submitText="Create AccessRolePolicy"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateAccessRolePolicy}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const accessRolePolicy = await createAccessRolePolicyMutation(
              values
            );
            router.push(
              Routes.ShowAccessRolePolicyPage({
                accessRolePolicyId: accessRolePolicy.id,
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
        <Link href={Routes.AccessRolePoliciesPage()}>
          <a>AccessRolePolicies</a>
        </Link>
      </p>
    </Layout>
  );
};

NewAccessRolePolicyPage.authenticate = true;

export default NewAccessRolePolicyPage;
