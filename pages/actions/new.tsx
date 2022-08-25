import { Routes } from "@blitzjs/next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation, usePaginatedQuery } from "@blitzjs/rpc";
import Layout from "app/core/layouts/Layout";
import createAction from "app/actions/mutations/createAction";
import { ActionForm, FORM_ERROR } from "app/actions/components/ActionForm";
import getProviders from "app/providers/queries/getProviders";
import { Suspense } from "react";

const ITEMS_PER_PAGE = 100;

const NewAction = () => {
  const router = useRouter();
  const [createActionMutation] = useMutation(createAction);
  const page = 0;
  const [{ providers, hasMore }] = usePaginatedQuery(getProviders, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  return (<>
    <h1>Create New Action</h1>
    <ActionForm
      submitText="Create Action"
      // TODO use a zod schema for form validation
      //  - Tip: extract mutation's schema into a shared `validations.ts` file and
      //         then import and use it here
      // schema={CreateAction}
      // initialValues={{}}
      options={providers.map((item) => {
        return { label: item.name, value: item.id.toString() }
      })}
      onSubmit={async (values) => {
        try {
          const action = await createActionMutation({
            name: values.name,
            provider_id: parseInt(values.provider_id)
          });
          void router.push(Routes.ShowActionPage({ actionId: action.id }));
        } catch (error: any) {
          console.error(error);
          return {
            [FORM_ERROR]: error.toString(),
          };
        }
      }}
    />

  </>
  );
};

const NewActionPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <NewAction />
      </Suspense>

      <p>
        <Link href={Routes.ActionsPage()}>
          <a>Actions</a>
        </Link>
      </p>
    </div>
  );
};

NewActionPage.authenticate = true;
NewActionPage.getLayout = (page) => <Layout>{page}</Layout>;


export default NewActionPage;
