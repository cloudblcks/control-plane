import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import Layout from "app/core/layouts/Layout";
import getAccessRole from "app/access-roles/queries/getAccessRole";
import deleteAccessRole from "app/access-roles/mutations/deleteAccessRole";

export const AccessRole = () => {
  const router = useRouter();
  const accessRoleId = useParam("accessRoleId", "number");
  const [deleteAccessRoleMutation] = useMutation(deleteAccessRole);
  const [accessRole] = useQuery(getAccessRole, { id: accessRoleId });

  return (
    <>
      <Head>
        <title>AccessRole {accessRole.id}</title>
      </Head>

      <div>
        <h1>AccessRole {accessRole.id}</h1>
        <pre>{JSON.stringify(accessRole, null, 2)}</pre>

        <Link href={Routes.AssignAccessRolePage({ accessRoleId: accessRole.id })}>
          <a>Assign to a resource</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteAccessRoleMutation({ id: accessRole.id });
              void router.push(Routes.AccessRolesPage());
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  );
};

const ShowAccessRolePage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.AccessRolesPage()}>
          <a>AccessRoles</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <AccessRole />
      </Suspense>
    </div>
  );
};

ShowAccessRolePage.authenticate = true;
ShowAccessRolePage.getLayout = (page) => <Layout>{page}</Layout>;

export default ShowAccessRolePage;
