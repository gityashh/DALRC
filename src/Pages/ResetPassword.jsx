import MetamaskRegister from "../Components/Auth/MetamaskRegister"
import { Link } from "react-router-dom"
import Navbar from "../Components/LandingPg/Navbar"
import Pwreset from "../Components/Login/Pwreset"

const Register = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <Pwreset />
        </div>
      </div>
    </div>
  )
}

export default Register
