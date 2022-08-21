import { Routes } from "@blitzjs/next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@blitzjs/rpc";
import Layout from "app/core/layouts/Layout";
import createAction from "app/actions/mutations/createAction";
import { ActionForm, FORM_ERROR } from "app/actions/components/ActionForm";

const NewActionPage = () => {
  const router = useRouter();
  const [createActionMutation] = useMutation(createAction);

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
        onSubmit={async (values) => {
          try {
            const action = await createActionMutation(values);
            router.push(Routes.ShowActionPage({ actionId: action.id }));
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
