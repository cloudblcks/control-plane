import { Button, MantineProvider } from "@mantine/core"
import Link from "next/link"

export const Header = () => {
  return (
    <div className="buttons" style={{ marginTop: "1rem" }}>
      <Link href="/" passHref>
        <Button component="a" >
          Home
        </Button>
      </Link>
      <Link href="/providers">
        <Button component="a">
          Providers
        </Button>
      </Link>
      <Link href="/provider-accounts">
        <Button component="a">
          Connected Accounts
        </Button>
      </Link>
      <Link href="/actions">
        <Button component="a">
          Actions
        </Button>
      </Link>
      <Link href="/resources">
        <Button component="a">
          Resources
        </Button>
      </Link>
      <Link href="/policies">
        <Button component="a">
          Policies
        </Button>
      </Link>
      <Link href="/access-roles">
        <Button component="a">
          Access Roles
        </Button>
      </Link>
    </div >
  )
}

export default Header
