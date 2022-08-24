import { Routes } from "@blitzjs/next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@blitzjs/rpc";
import Layout from "app/core/layouts/Layout";
import createProvider from "app/providers/mutations/createProvider";
import {
  ProviderForm,
  FORM_ERROR,
} from "app/providers/components/ProviderForm";

const NewProviderPage = () => {
  const router = useRouter();
  const [createProviderMutation] = useMutation(createProvider);

  return (
    <Layout title={"Create New Provider"}>
      <h1>Create New Provider</h1>

      <ProviderForm
        submitText="Create Provider"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateProvider}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const provider = await createProviderMutation(values);
            void router.push(Routes.ShowProviderPage({ providerId: provider.id }));
          } catch (error: any) {
            console.error(error);
            return {
              [FORM_ERROR]: error.toString(),
            };
          }
        }}
      />

      <p>
        <Link href={Routes.ProvidersPage()}>
          <a>Providers</a>
        </Link>
      </p>
    </Layout>
  );
};

NewProviderPage.authenticate = true;

export default NewProviderPage;
