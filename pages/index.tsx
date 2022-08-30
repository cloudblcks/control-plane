import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import AuthorizedLayout from "app/core/layouts/AuthorizedLayout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"
import { useMutation } from "@blitzjs/rpc"
import { Routes, BlitzPage } from "@blitzjs/next"
import { Button, Container, Title, Text, Anchor, Paper, Center } from "@mantine/core"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  console.log("Current user: " + currentUser)
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>

        <Text color="dimmed" size="sm" align="center" mt={5}>
          <div>
            User id: <code>{currentUser.id}</code>
            <br />
            User role: <code>{currentUser.role}</code>
          </div>
        </Text>
        <Center my={5}>
          <Button
            color="red"
            onClick={async () => {
              await logoutMutation()
            }}
          >
            Logout
          </Button>
        </Center>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <AuthorizedLayout title="Home">
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
        >
          Welcome to Cloudblocks!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Here you can configure IAM roles and policies for all your managed, serverless and PaaS infrastrucutre.

        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Suspense fallback="Loading...">
            <UserInfo />
          </Suspense>
        </Paper>
      </Container>

    </AuthorizedLayout >
  )
}

Home.authenticate = { redirectTo: Routes.LoginPage() }

export default Home
