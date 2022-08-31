import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import AuthorizedLayout from "app/core/layouts/AuthorizedLayout";
import getAction from "app/actions/queries/getAction";
import deleteAction from "app/actions/mutations/deleteAction";

export const Action = () => {
  const router = useRouter();
  const actionId = useParam("actionId", "number");
  const [deleteActionMutation] = useMutation(deleteAction);
  const [action] = useQuery(getAction, { id: actionId });

  return (
    <>
      <Head>
        <title>Action {action.id}</title>
      </Head>

      <div>
        <h1>Action {action.id}</h1>
        <pre>{JSON.stringify(action, null, 2)}</pre>

        <Link href={Routes.EditActionPage({ actionId: action.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteActionMutation({ id: action.id });
              void router.push(Routes.ActionsPage());
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

const ShowActionPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.ActionsPage()}>
          <a>Actions</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Action />
      </Suspense>
    </div>
  );
};

ShowActionPage.authenticate = true;
ShowActionPage.getLayout = (page) => <AuthorizedLayout>{page}</AuthorizedLayout>;

export default ShowActionPage;
