import { Routes } from "@blitzjs/next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@blitzjs/rpc";
import Layout from "app/core/layouts/Layout";
import createResource from "app/resources/mutations/createResource";
import {
  ResourceForm,
  FORM_ERROR,
} from "app/resources/components/ResourceForm";

const NewResourcePage = () => {
  const router = useRouter();
  const [createResourceMutation] = useMutation(createResource);

  return (
    <Layout title={"Create New Resource"}>
      <h1>Create New Resource</h1>

      <ResourceForm
        submitText="Create Resource"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateResource}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const resource = await createResourceMutation(values);
            router.push(Routes.ShowResourcePage({ resourceId: resource.id }));
          } catch (error: any) {
            console.error(error);
            return {
              [FORM_ERROR]: error.toString(),
            };
          }
        }}
      />

      <p>
        <Link href={Routes.ResourcesPage()}>
          <a>Resources</a>
        </Link>
      </p>
    </Layout>
  );
};

NewResourcePage.authenticate = true;

export default NewResourcePage;
