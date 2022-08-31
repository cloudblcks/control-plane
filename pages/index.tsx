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


const Home: BlitzPage = () => {
  return (
    <AuthorizedLayout title="Home">
      <Center>
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


        </Container>
      </Center>

    </AuthorizedLayout >
  )
}

Home.authenticate = { redirectTo: Routes.LoginPage() }

export default Home
