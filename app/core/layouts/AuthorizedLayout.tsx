import Head from "next/head"
import React, { FC, useState } from "react"
import { BlitzLayout } from "@blitzjs/next"
import Sidebar from "../components/Sidebar";
import { ActionIcon, AppShell, Center, Code, Footer, Group, Header, useMantineColorScheme, Text, MediaQuery, Burger, useMantineTheme } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons";
import { useMutation } from "@blitzjs/rpc";
import logout from "app/auth/mutations/logout";

const AuthorizedLayout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({ title, children }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [logoutMutation] = useMutation(logout)
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const today = new Date();
  return (
    <>
      <Head>
        <title>{title || "control-plane"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppShell
        padding="md"
        fixed={false}
        navbar={
          <Sidebar logoutMutation={logoutMutation} p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}> </Sidebar>
        }
        header={
          <Header height={60}>
            <Group
              sx={{ height: '100%' }}
              px={20}
              position="apart">
              {/* <Logo colorScheme={colorScheme} /> */}
              <Group position="apart">
                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                  <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    size="sm"
                    color={theme.colors.gray[6]}
                    mr="xl"
                  />
                </MediaQuery>
                <Text >Cloudblocks</Text>
                <Code sx={{ fontWeight: 700 }}>v0.0.1</Code>
              </Group>
              <Center>
                <Text size="xl">
                  {title}
                </Text>
              </Center>
              <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
                {colorScheme === 'dark' ? <IconSun size={16} /> : <IconMoonStars size={16} />}
              </ActionIcon>
            </Group>
          </Header>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        })}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        footer={
          <Footer height={60} p="md">
            <Center>
              <Text>&copy; {today.getFullYear()} Cloudblox Ltd. All rights reserved.</Text>
            </Center>
          </Footer>
        }
      >
        {children}
      </AppShell>
    </>
  )
}

export default AuthorizedLayout


