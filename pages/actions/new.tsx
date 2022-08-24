import { Routes } from "@blitzjs/next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation, usePaginatedQuery } from "@blitzjs/rpc";
import Layout from "app/core/layouts/Layout";
import createAction from "app/actions/mutations/createAction";
import { ActionForm, FORM_ERROR } from "app/actions/components/ActionForm";
import { useCurrentUser } from "app/core/hooks/useCurrentUser";
import getProviders from "app/providers/queries/getProviders";

const ITEMS_PER_PAGE = 100;

const NewActionPage = () => {
  const router = useRouter();
  const [createActionMutation] = useMutation(createAction);
  const page = Number(router.query.page) || 0;
  const [{ providers, hasMore }] = usePaginatedQuery(getProviders, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });
  const currentUser = useCurrentUser()

  return (
    <Layout title={"Create New Action"}>
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

      <p>
        <Link href={Routes.ActionsPage()}>
          <a>Actions</a>
        </Link>
      </p>
    </Layout>
  );
};

NewActionPage.authenticate = true;

export default NewActionPage;
