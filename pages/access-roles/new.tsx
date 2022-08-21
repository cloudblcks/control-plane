import { Routes } from "@blitzjs/next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@blitzjs/rpc";
import Layout from "app/core/layouts/Layout";
import createAccessRole from "app/access-roles/mutations/createAccessRole";
import {
  AccessRoleForm,
  FORM_ERROR,
} from "app/access-roles/components/AccessRoleForm";

const NewAccessRolePage = () => {
  const router = useRouter();
  const [createAccessRoleMutation] = useMutation(createAccessRole);

  return (
    <Layout title={"Create New AccessRole"}>
      <h1>Create New AccessRole</h1>

      <AccessRoleForm
        submitText="Create AccessRole"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateAccessRole}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const accessRole = await createAccessRoleMutation(values);
            router.push(
              Routes.ShowAccessRolePage({ accessRoleId: accessRole.id })
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
        <Link href={Routes.AccessRolesPage()}>
          <a>AccessRoles</a>
        </Link>
      </p>
    </Layout>
  );
};

NewAccessRolePage.authenticate = true;

export default NewAccessRolePage;
