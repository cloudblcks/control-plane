import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import Layout from "app/core/layouts/Layout";
import getPolicyResource from "app/policy-resources/queries/getPolicyResource";
import deletePolicyResource from "app/policy-resources/mutations/deletePolicyResource";

export const PolicyResource = () => {
  const router = useRouter();
  const policyResourceId = useParam("policyResourceId", "number");
  const [deletePolicyResourceMutation] = useMutation(deletePolicyResource);
  const [policyResource] = useQuery(getPolicyResource, {
    id: policyResourceId,
  });

  return (
    <>
      <Head>
        <title>PolicyResource {policyResource.id}</title>
      </Head>

      <div>
        <h1>PolicyResource {policyResource.id}</h1>
        <pre>{JSON.stringify(policyResource, null, 2)}</pre>

        <Link
          href={Routes.EditPolicyResourcePage({
            policyResourceId: policyResource.id,
          })}
        >
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deletePolicyResourceMutation({ id: policyResource.id });
              router.push(Routes.PolicyResourcesPage());
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

const ShowPolicyResourcePage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.PolicyResourcesPage()}>
          <a>PolicyResources</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <PolicyResource />
      </Suspense>
    </div>
  );
};

ShowPolicyResourcePage.authenticate = true;
ShowPolicyResourcePage.getLayout = (page) => <Layout>{page}</Layout>;

export default ShowPolicyResourcePage;
