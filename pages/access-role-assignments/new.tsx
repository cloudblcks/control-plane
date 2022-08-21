import { Routes } from "@blitzjs/next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@blitzjs/rpc";
import Layout from "app/core/layouts/Layout";
import createAccessRoleAssignment from "app/access-role-assignments/mutations/createAccessRoleAssignment";
import {
  AccessRoleAssignmentForm,
  FORM_ERROR,
} from "app/access-role-assignments/components/AccessRoleAssignmentForm";

const NewAccessRoleAssignmentPage = () => {
  const router = useRouter();
  const [createAccessRoleAssignmentMutation] = useMutation(
    createAccessRoleAssignment
  );

  return (
    <Layout title={"Create New AccessRoleAssignment"}>
      <h1>Create New AccessRoleAssignment</h1>

      <AccessRoleAssignmentForm
        submitText="Create AccessRoleAssignment"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateAccessRoleAssignment}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const accessRoleAssignment =
              await createAccessRoleAssignmentMutation(values);
            router.push(
              Routes.ShowAccessRoleAssignmentPage({
                accessRoleAssignmentId: accessRoleAssignment.id,
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
        <Link href={Routes.AccessRoleAssignmentsPage()}>
          <a>AccessRoleAssignments</a>
        </Link>
      </p>
    </Layout>
  );
};

NewAccessRoleAssignmentPage.authenticate = true;

export default NewAccessRoleAssignmentPage;
