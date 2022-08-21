import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import Layout from "app/core/layouts/Layout";
import getAction from "app/actions/queries/getAction";
import updateAction from "app/actions/mutations/updateAction";
import { ActionForm, FORM_ERROR } from "app/actions/components/ActionForm";

export const EditAction = () => {
  const router = useRouter();
  const actionId = useParam("actionId", "number");
  const [action, { setQueryData }] = useQuery(
    getAction,
    { id: actionId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  );
  const [updateActionMutation] = useMutation(updateAction);

  return (
    <>
      <Head>
        <title>Edit Action {action.id}</title>
      </Head>

      <div>
        <h1>Edit Action {action.id}</h1>
        <pre>{JSON.stringify(action, null, 2)}</pre>

        <ActionForm
          submitText="Update Action"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateAction}
          initialValues={action}
          onSubmit={async (values) => {
            try {
              const updated = await updateActionMutation({
                id: action.id,
                ...values,
              });
              await setQueryData(updated);
              router.push(Routes.ShowActionPage({ actionId: updated.id }));
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

const EditActionPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditAction />
      </Suspense>

      <p>
        <Link href={Routes.ActionsPage()}>
          <a>Actions</a>
        </Link>
      </p>
    </div>
  );
};

EditActionPage.authenticate = true;
EditActionPage.getLayout = (page) => <Layout>{page}</Layout>;

export default EditActionPage;
