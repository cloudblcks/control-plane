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
  FORM_ERROR,
} from "app/access-roles/components/AccessRoleForm";
import { AccessRoleAssignmentForm } from "app/access-roles/components/AccessRoleAssignmentForm";
import createResourceAccessRole from "app/resource-access-roles/mutations/createResourceAccessRole";
import getResources from "app/resources/queries/getResources";

export const AssignAccessRole = () => {
  const router = useRouter();
  const accessRoleId = useParam("accessRoleId", "number");
  const [createResourceAccessRoleMutation] = useMutation(createResourceAccessRole);
  const [accessRole, { setQueryData }] = useQuery(
    getAccessRole,
    { id: accessRoleId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  );

  const [{ resources }] = useQuery(getResources, {}, {
    // This ensures the query never refreshes and overwrites the form data while the user is editing.
    staleTime: Infinity,
  });
  const [updateAccessRoleMutation] = useMutation(updateAccessRole);

  return (
    <>
      <Head>
        <title>Edit AccessRole {accessRole.id}</title>
      </Head>

      <div>
        <h1>Assign AccessRole {accessRole.name}</h1>
        <pre>{JSON.stringify(accessRole, null, 2)}</pre>

        <AccessRoleAssignmentForm
          submitText="Assign AccessRole"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateAccessRole}
          initialValues={accessRole}
          accessRole={accessRole}
          resources={resources.map((x) => { return { label: x.name, value: x.id.toString() } })}
          onSubmit={async (values) => {
            try {
              const resourceAccessRole = await createResourceAccessRoleMutation({
                access_role_id: accessRole.id,
                resource_id: parseInt(values.resource_id)
              });
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
      </div>
    </>
  );
};

const AssignAccessRolePage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <AssignAccessRole />
      </Suspense>

      <p>
        <Link href={Routes.AccessRolesPage()}>
          <a>AccessRoles</a>
        </Link>
      </p>
    </div>
  );
};

AssignAccessRolePage.authenticate = true;
AssignAccessRolePage.getLayout = (page) => <Layout>{page}</Layout>;

export default AssignAccessRolePage;
