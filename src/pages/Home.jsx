import Blogs from "../components/home/Blogs"
import FAQSection from "../components/home/FAQSection"
import Features from "../components/home/Features"
import HeaderSection from "../components/home/HeaderSection"
import HomeAbout from "../components/home/HomeAbout"
// import ReviewSection from "../components/home/ReviewSection"
import TamakonSection from "../components/home/TamakonSection"
// import TrustWorthy from "../components/home/TrustWorthy"



const Home = () => {
  return (
    <div>
        <HeaderSection/>
        <HomeAbout/>
        <Features />
        <TamakonSection />
        {/* <TrustWorthy/> */}
        {/* <Blogs/> */}
        {/* <ReviewSection/> */}
        {/* <FAQSection/> */}
    </div>
  )
}

export default Home