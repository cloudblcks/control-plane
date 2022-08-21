import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import Layout from "app/core/layouts/Layout";
import getPolicyAction from "app/policy-actions/queries/getPolicyAction";
import deletePolicyAction from "app/policy-actions/mutations/deletePolicyAction";

export const PolicyAction = () => {
  const router = useRouter();
  const policyActionId = useParam("policyActionId", "number");
  const [deletePolicyActionMutation] = useMutation(deletePolicyAction);
  const [policyAction] = useQuery(getPolicyAction, { id: policyActionId });

  return (
    <>
      <Head>
        <title>PolicyAction {policyAction.id}</title>
      </Head>

      <div>
        <h1>PolicyAction {policyAction.id}</h1>
        <pre>{JSON.stringify(policyAction, null, 2)}</pre>

        <Link
          href={Routes.EditPolicyActionPage({
            policyActionId: policyAction.id,
          })}
        >
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deletePolicyActionMutation({ id: policyAction.id });
              router.push(Routes.PolicyActionsPage());
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

const ShowPolicyActionPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.PolicyActionsPage()}>
          <a>PolicyActions</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <PolicyAction />
      </Suspense>
    </div>
  );
};

ShowPolicyActionPage.authenticate = true;
ShowPolicyActionPage.getLayout = (page) => <Layout>{page}</Layout>;

export default ShowPolicyActionPage;
