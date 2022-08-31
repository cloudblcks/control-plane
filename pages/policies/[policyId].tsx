import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import AuthorizedLayout from "app/core/layouts/AuthorizedLayout";
import getPolicy from "app/policies/queries/getPolicy";
import deletePolicy from "app/policies/mutations/deletePolicy";

export const Policy = () => {
  const router = useRouter();
  const policyId = useParam("policyId", "number");
  const [deletePolicyMutation] = useMutation(deletePolicy);
  const [policy] = useQuery(getPolicy, { id: policyId });

  return (
    <>
      <Head>
        <title>Policy {policy.id}</title>
      </Head>

      <div>
        <h1>Policy {policy.id}</h1>
        <pre>{JSON.stringify(policy, null, 2)}</pre>

        <Link href={Routes.EditPolicyPage({ policyId: policy.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deletePolicyMutation({ id: policy.id });
              void router.push(Routes.PoliciesPage());
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

const ShowPolicyPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.PoliciesPage()}>
          <a>Policies</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Policy />
      </Suspense>
    </div>
  );
};

ShowPolicyPage.authenticate = true;
ShowPolicyPage.getLayout = (page) => <AuthorizedLayout>{page}</AuthorizedLayout>;

export default ShowPolicyPage;
