import Header from "../components/common/Header"
import HeroSection from "../components/hero/HeroSection"
import RosterSection from "../components/roster/RosterSection"
import Partners from "../components/partners/Partners"
import UniformSection from "../components/uniform/UniformSection"
import VidSection from "../components/vid/VidSection"
import NewsSection from "../components/news/NewsSection"
import Footer from "../components/common/Footer"

function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <RosterSection />
        <Partners />
        <UniformSection />
        <VidSection />
        <NewsSection />
        <Footer />
      </main>
    </>
  )
}

export default Home