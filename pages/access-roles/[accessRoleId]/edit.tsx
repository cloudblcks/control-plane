import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import Layout from "app/core/layouts/Layout";
import getAccessRole from "app/access-roles/queries/getAccessRole";
import updateAccessRole from "app/access-roles/mutations/updateAccessRole";
import {
  AccessRoleForm,
  FORM_ERROR,
} from "app/access-roles/components/AccessRoleForm";

export const EditAccessRole = () => {
  const router = useRouter();
  const accessRoleId = useParam("accessRoleId", "number");
  const [accessRole, { setQueryData }] = useQuery(
    getAccessRole,
    { id: accessRoleId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  );
  const [updateAccessRoleMutation] = useMutation(updateAccessRole);

  return (
    <>
      <Head>
        <title>Edit AccessRole {accessRole.id}</title>
      </Head>

      <div>
        <h1>Edit AccessRole {accessRole.id}</h1>
        <pre>{JSON.stringify(accessRole, null, 2)}</pre>

        <AccessRoleForm
          submitText="Update AccessRole"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateAccessRole}
          initialValues={accessRole}
          onSubmit={async (values) => {
            try {
              const updated = await updateAccessRoleMutation({
                id: accessRole.id,
                ...values,
              });
              await setQueryData(updated);
              router.push(
                Routes.ShowAccessRolePage({ accessRoleId: updated.id })
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

const EditAccessRolePage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditAccessRole />
      </Suspense>

      <p>
        <Link href={Routes.AccessRolesPage()}>
          <a>AccessRoles</a>
        </Link>
      </p>
    </div>
  );
};

EditAccessRolePage.authenticate = true;
EditAccessRolePage.getLayout = (page) => <Layout>{page}</Layout>;

export default EditAccessRolePage;
