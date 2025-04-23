import Navbar from "../Components/LandingPg/Navbar"
import Headsection from "../Components/LandingPg/Headsection"
import Features from "../Components/LandingPg/Features.jsx"
import FAQ from "../Components/LandingPg/FAQ"
import ContactForm from "../Components/LandingPg/ContactForm"
import Footer from "../Components/LandingPg/Footer"

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Headsection />
      <Features />
      <FAQ />
      <ContactForm />
      <Footer />
    </div>
  )
}

export default Home
