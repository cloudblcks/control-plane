import { Routes } from "@blitzjs/next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@blitzjs/rpc";
import Layout from "app/core/layouts/Layout";
import createRole from "app/roles/mutations/createRole";
import { RoleForm, FORM_ERROR } from "app/roles/components/RoleForm";

const NewRolePage = () => {
  const router = useRouter();
  const [createRoleMutation] = useMutation(createRole);

  return (
    <Layout title={"Create New Role"}>
      <h1>Create New Role</h1>

      <RoleForm
        submitText="Create Role"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateRole}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const role = await createRoleMutation(values);
            router.push(Routes.ShowRolePage({ roleId: role.id }));
          } catch (error: any) {
            console.error(error);
            return {
              [FORM_ERROR]: error.toString(),
            };
          }
        }}
      />

      <p>
        <Link href={Routes.RolesPage()}>
          <a>Roles</a>
        </Link>
      </p>
    </Layout>
  );
};

NewRolePage.authenticate = true;

export default NewRolePage;
