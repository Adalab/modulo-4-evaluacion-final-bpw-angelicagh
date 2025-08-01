import logo from "../images/logo.png"


function Header() {
  
  return (
    <>
      <div className="logo-container">
      <img className="logo" src={logo} alt="logo" />
      </div>
    </>
  )
}

export default Header