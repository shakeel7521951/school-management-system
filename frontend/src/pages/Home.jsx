import Blogs from "../components/home/Blogs"
import FAQSection from "../components/home/FAQSection"
import Features from "../components/home/Features"
import HeaderSection from "../components/home/HeaderSection"
import ReviewSection from "../components/home/ReviewSection"
import StudyReserach from "../components/home/StudyReserach"
import TrustWorthy from "../components/home/TrustWorthy"



const Home = () => {
  return (
    <div>
        <HeaderSection/>
        <StudyReserach/>
        <Features />
        {/* <TrustWorthy/> */}
        {/* <Blogs/> */}
        {/* <ReviewSection/> */}
        {/* <FAQSection/> */}
    </div>
  )
}

export default Home