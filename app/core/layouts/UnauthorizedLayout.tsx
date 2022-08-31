import Head from "next/head"
import React, { FC } from "react"
import { BlitzLayout } from "@blitzjs/next"
import Sidebar from "../components/Sidebar";
import { ActionIcon, AppShell, Code, Group, Header, useMantineColorScheme } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons";
import { useMutation } from "@blitzjs/rpc";
import logout from "app/auth/mutations/logout";

const UnauthorizedLayout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({ title, children }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [logoutMutation] = useMutation(logout)
  return (
    <>
      <Head>
        <title>{title || "control-plane"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <Header height={60}>
        <Group sx={{ height: '100%' }} px={20} position="apart">
          {/* <Logo colorScheme={colorScheme} /> */}
          <Group position="apart">
            Cloudblocks
            <Code sx={{ fontWeight: 700 }}>v0.0.1</Code>
          </Group>
          <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
            {colorScheme === 'dark' ? <IconSun size={16} /> : <IconMoonStars size={16} />}
          </ActionIcon>
        </Group>
      </Header>

      {children}
    </>
  )
}

export default UnauthorizedLayout


