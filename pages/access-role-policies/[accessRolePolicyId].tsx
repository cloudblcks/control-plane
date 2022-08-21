import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import Layout from "app/core/layouts/Layout";
import getAccessRolePolicy from "app/access-role-policies/queries/getAccessRolePolicy";
import deleteAccessRolePolicy from "app/access-role-policies/mutations/deleteAccessRolePolicy";

export const AccessRolePolicy = () => {
  const router = useRouter();
  const accessRolePolicyId = useParam("accessRolePolicyId", "number");
  const [deleteAccessRolePolicyMutation] = useMutation(deleteAccessRolePolicy);
  const [accessRolePolicy] = useQuery(getAccessRolePolicy, {
    id: accessRolePolicyId,
  });

  return (
    <>
      <Head>
        <title>AccessRolePolicy {accessRolePolicy.id}</title>
      </Head>

      <div>
        <h1>AccessRolePolicy {accessRolePolicy.id}</h1>
        <pre>{JSON.stringify(accessRolePolicy, null, 2)}</pre>

        <Link
          href={Routes.EditAccessRolePolicyPage({
            accessRolePolicyId: accessRolePolicy.id,
          })}
        >
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteAccessRolePolicyMutation({ id: accessRolePolicy.id });
              router.push(Routes.AccessRolePoliciesPage());
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

const ShowAccessRolePolicyPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.AccessRolePoliciesPage()}>
          <a>AccessRolePolicies</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <AccessRolePolicy />
      </Suspense>
    </div>
  );
};

ShowAccessRolePolicyPage.authenticate = true;
ShowAccessRolePolicyPage.getLayout = (page) => <Layout>{page}</Layout>;

export default ShowAccessRolePolicyPage;
