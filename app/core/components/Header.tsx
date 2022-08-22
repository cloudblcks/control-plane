import Link from "next/link"

export const Header = () => {
  return (
    <div className="buttons" style={{ marginTop: "5rem" }}>
      <Link href="/">
        <a
          className="button"
          rel="noopener noreferrer"
        >
          Home
        </a>
      </Link>
      <Link href="/providers">
        <a
          className="button-outline"
          rel="noopener noreferrer"
        >
          Providers
        </a>
      </Link>
      <Link href="/provider-accounts">
        <a
          className="button-outline"
          rel="noopener noreferrer"
        >
          Connected Accounts
        </a>
      </Link>
      <Link href="/actions">
        <a
          className="button-outline"
          rel="noopener noreferrer"
        >
          Actions
        </a>
      </Link>
      <Link href="/resources">
        <a
          className="button-outline"
          rel="noopener noreferrer"
        >
          Resources
        </a>
      </Link>
      <Link href="/policies">
        <a
          className="button-outline"
          rel="noopener noreferrer"
        >
          Policies
        </a>
      </Link>
      <Link href="/access-roles">
        <a
          className="button-outline"
          rel="noopener noreferrer"
        >
          Access Roles
        </a>
      </Link>
    </div>
  )
}



export default Header
