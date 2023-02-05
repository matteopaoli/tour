import Navbar from "../navbar"

interface NavbarLayoutProps {
  children: JSX.Element
}

const NavbarLayout = ({ children }: NavbarLayoutProps) => {
  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
    </>
  )
}

export default NavbarLayout