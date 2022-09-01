import { Routes } from "@blitzjs/next";
import { useMutation, usePaginatedQuery } from "@blitzjs/rpc";
import { ActionIcon, Box, Button, Center, Container, Group, Table, Text } from "@mantine/core";
import { IconInfoCircle, IconPencil, IconTrash } from "@tabler/icons";
import AuthorizedLayout from "app/core/layouts/AuthorizedLayout";
import deleteProviderAccount from "app/provider-accounts/mutations/deleteProviderAccount";
import getProviderAccounts from "app/provider-accounts/queries/getProviderAccounts";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Suspense } from "react";

const ITEMS_PER_PAGE = 100;

export const ProviderAccountsList = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ providerAccounts, hasMore }] = usePaginatedQuery(
    getProviderAccounts,
    {
      orderBy: { id: "asc" },
      skip: ITEMS_PER_PAGE * page,
      take: ITEMS_PER_PAGE,
    }
  );

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
  const goToNextPage = () => router.push({ query: { page: page + 1 } });
  const [deleteProviderAccountMutation] = useMutation(deleteProviderAccount);
  return (
    <Container>
      <Table verticalSpacing="lg">
        <thead>
          <tr>
            <th><Text>Name</Text></th>
            <th />
          </tr>
        </thead>
        <tbody>
          {providerAccounts.map((providerAccount) => (
            <tr key={providerAccount.id}>
              <td><Text>{providerAccount.name}</Text></td>
              <td>
                <Group spacing={2} position="right">
                  <Link href={Routes.ShowProviderAccountPage({ providerAccountId: providerAccount.id })}>
                    <ActionIcon color="blue">
                      <IconInfoCircle size={20} stroke={1.5} />
                    </ActionIcon>
                  </Link>
                  <Link href={Routes.EditProviderAccountPage({ providerAccountId: providerAccount.id })}>
                    <ActionIcon>
                      <IconPencil size={20} stroke={1.5} />
                    </ActionIcon>
                  </Link>
                  <ActionIcon color="red" onClick={async () => {
                    if (window.confirm("Provider account " + providerAccount.name + " will be deleted. Are you sure?")) {
                      await deleteProviderAccountMutation({ id: providerAccount.id });
                      void router.push(Routes.ProviderAccountsPage());
                    }
                  }}>
                    <IconTrash size={20} stroke={1.5} />
                  </ActionIcon>
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
        <Link href={Routes.NewProviderAccountPage()}>
          <Button component="a">Connect New Provider Account</Button>
        </Link>
      </Group>
    </Container>
  );
};

const ProviderAccountsPage = () => {
  return (
    <AuthorizedLayout>
      <Head>
        <title>ProviderAccounts</title>
      </Head>

      <Box
        sx={(theme) => ({
          padding: theme.spacing.xl,
          borderRadius: theme.radius.md,
          backgroundColor: theme.white,
        })}
      >
        <Suspense fallback={<Center><Text>Loading...</Text></Center>}>
          <ProviderAccountsList />
        </Suspense>
      </Box>
    </AuthorizedLayout>
  );
};

export default ProviderAccountsPage;
