import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import Layout from "app/core/layouts/Layout";
import getAccessRolePolicy from "app/access-role-policies/queries/getAccessRolePolicy";
import updateAccessRolePolicy from "app/access-role-policies/mutations/updateAccessRolePolicy";
import {
  AccessRolePolicyForm,
  FORM_ERROR,
} from "app/access-role-policies/components/AccessRolePolicyForm";

export const EditAccessRolePolicy = () => {
  const router = useRouter();
  const accessRolePolicyId = useParam("accessRolePolicyId", "number");
  const [accessRolePolicy, { setQueryData }] = useQuery(
    getAccessRolePolicy,
    { id: accessRolePolicyId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  );
  const [updateAccessRolePolicyMutation] = useMutation(updateAccessRolePolicy);

  return (
    <>
      <Head>
        <title>Edit AccessRolePolicy {accessRolePolicy.id}</title>
      </Head>

      <div>
        <h1>Edit AccessRolePolicy {accessRolePolicy.id}</h1>
        <pre>{JSON.stringify(accessRolePolicy, null, 2)}</pre>

        <AccessRolePolicyForm
          submitText="Update AccessRolePolicy"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateAccessRolePolicy}
          initialValues={accessRolePolicy}
          onSubmit={async (values) => {
            try {
              const updated = await updateAccessRolePolicyMutation({
                id: accessRolePolicy.id,
                ...values,
              });
              await setQueryData(updated);
              router.push(
                Routes.ShowAccessRolePolicyPage({
                  accessRolePolicyId: updated.id,
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

const EditAccessRolePolicyPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditAccessRolePolicy />
      </Suspense>

      <p>
        <Link href={Routes.AccessRolePoliciesPage()}>
          <a>AccessRolePolicies</a>
        </Link>
      </p>
    </div>
  );
};

EditAccessRolePolicyPage.authenticate = true;
EditAccessRolePolicyPage.getLayout = (page) => <Layout>{page}</Layout>;

export default EditAccessRolePolicyPage;
