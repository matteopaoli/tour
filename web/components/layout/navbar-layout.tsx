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
      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            <strong>BUS TICKETS</strong> by <a href="https://jgthms.com">Matteo Paoli</a>. The source code is licensed
            <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
            is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
          </p>
        </div>
      </footer>
    </>
  )
}

export default NavbarLayout