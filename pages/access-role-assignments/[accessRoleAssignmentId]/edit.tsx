import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import Layout from "app/core/layouts/Layout";
import getAccessRoleAssignment from "app/access-role-assignments/queries/getAccessRoleAssignment";
import updateAccessRoleAssignment from "app/access-role-assignments/mutations/updateAccessRoleAssignment";
import {
  AccessRoleAssignmentForm,
  FORM_ERROR,
} from "app/access-role-assignments/components/AccessRoleAssignmentForm";

export const EditAccessRoleAssignment = () => {
  const router = useRouter();
  const accessRoleAssignmentId = useParam("accessRoleAssignmentId", "number");
  const [accessRoleAssignment, { setQueryData }] = useQuery(
    getAccessRoleAssignment,
    { id: accessRoleAssignmentId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  );
  const [updateAccessRoleAssignmentMutation] = useMutation(
    updateAccessRoleAssignment
  );

  return (
    <>
      <Head>
        <title>Edit AccessRoleAssignment {accessRoleAssignment.id}</title>
      </Head>

      <div>
        <h1>Edit AccessRoleAssignment {accessRoleAssignment.id}</h1>
        <pre>{JSON.stringify(accessRoleAssignment, null, 2)}</pre>

        <AccessRoleAssignmentForm
          submitText="Update AccessRoleAssignment"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateAccessRoleAssignment}
          initialValues={accessRoleAssignment}
          onSubmit={async (values) => {
            try {
              const updated = await updateAccessRoleAssignmentMutation({
                id: accessRoleAssignment.id,
                ...values,
              });
              await setQueryData(updated);
              router.push(
                Routes.ShowAccessRoleAssignmentPage({
                  accessRoleAssignmentId: updated.id,
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
      </div>
    </>
  );
};

const EditAccessRoleAssignmentPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditAccessRoleAssignment />
      </Suspense>

      <p>
        <Link href={Routes.AccessRoleAssignmentsPage()}>
          <a>AccessRoleAssignments</a>
        </Link>
      </p>
    </div>
  );
};

EditAccessRoleAssignmentPage.authenticate = true;
EditAccessRoleAssignmentPage.getLayout = (page) => <Layout>{page}</Layout>;

export default EditAccessRoleAssignmentPage;
