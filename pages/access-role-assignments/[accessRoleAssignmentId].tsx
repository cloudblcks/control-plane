import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import Layout from "app/core/layouts/Layout";
import getAccessRoleAssignment from "app/access-role-assignments/queries/getAccessRoleAssignment";
import deleteAccessRoleAssignment from "app/access-role-assignments/mutations/deleteAccessRoleAssignment";

export const AccessRoleAssignment = () => {
  const router = useRouter();
  const accessRoleAssignmentId = useParam("accessRoleAssignmentId", "number");
  const [deleteAccessRoleAssignmentMutation] = useMutation(
    deleteAccessRoleAssignment
  );
  const [accessRoleAssignment] = useQuery(getAccessRoleAssignment, {
    id: accessRoleAssignmentId,
  });

  return (
    <>
      <Head>
        <title>AccessRoleAssignment {accessRoleAssignment.id}</title>
      </Head>

      <div>
        <h1>AccessRoleAssignment {accessRoleAssignment.id}</h1>
        <pre>{JSON.stringify(accessRoleAssignment, null, 2)}</pre>

        <Link
          href={Routes.EditAccessRoleAssignmentPage({
            accessRoleAssignmentId: accessRoleAssignment.id,
          })}
        >
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteAccessRoleAssignmentMutation({
                id: accessRoleAssignment.id,
              });
              router.push(Routes.AccessRoleAssignmentsPage());
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

const ShowAccessRoleAssignmentPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.AccessRoleAssignmentsPage()}>
          <a>AccessRoleAssignments</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <AccessRoleAssignment />
      </Suspense>
    </div>
  );
};

ShowAccessRoleAssignmentPage.authenticate = true;
ShowAccessRoleAssignmentPage.getLayout = (page) => <Layout>{page}</Layout>;

export default ShowAccessRoleAssignmentPage;
