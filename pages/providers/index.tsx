import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { usePaginatedQuery } from "@blitzjs/rpc";
import { useRouter } from "next/router";
import AuthorizedLayout from "app/core/layouts/AuthorizedLayout";
import getProviders from "app/providers/queries/getProviders";
import { Button, Table, Container, Group, Text, Center } from "@mantine/core";
import ProviderItem from "app/providers/components/ProviderItem";

const ITEMS_PER_PAGE = 100;

export const ProvidersList = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ providers, hasMore }] = usePaginatedQuery(getProviders, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
  const goToNextPage = () => router.push({ query: { page: page + 1 } });

  return (
    <Container>
      <Table verticalSpacing="lg" striped>
        <thead>
          <tr>
            <th><Text>Name</Text></th>
            <th><Text>Category</Text></th>
            <th><Text align="right">Actions</Text></th>
          </tr>
        </thead>
        <tbody>
          {providers.map((provider) => (
            <tr key={provider.id}>
              <td>{provider.name}</td>
              <td>{provider.category}</td>
              <td>
                <Group position="right">
                  <Link href={Routes.ShowProviderPage({ providerId: provider.id })}>
                    <Button variant="outline" component="a">View</Button>
                  </Link>
                  <Button variant="default">Delete</Button>
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Group position="apart">
        <Group position="left">
          <Button disabled={page === 0} onClick={goToPreviousPage}>
            Previous
          </Button>
          <Button disabled={!hasMore} onClick={goToNextPage}>
            Next
          </Button>
        </Group>
        <Link href={Routes.NewProviderPage()}>
          <Button component="a">Create New Provider</Button>
        </Link>
      </Group>
    </Container>
  );
};

const ProvidersPage = () => {
  return (
    <AuthorizedLayout title="Providers">
      <Head>
        <title>Providers</title>
      </Head>

      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <ProvidersList />
        </Suspense>
      </div>
    </AuthorizedLayout>
  );
};

export default ProvidersPage;
