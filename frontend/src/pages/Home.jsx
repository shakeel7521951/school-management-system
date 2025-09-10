import Blogs from "../components/home/Blogs"
import HeaderSection from "../components/home/HeaderSection"
import StudyReserach from "../components/home/StudyReserach"
import TrustWorthy from "../components/home/TrustWorthy"



const Home = () => {
  return (
    <div>
        <HeaderSection/>
        <TrustWorthy/>
        <StudyReserach/>
        <Blogs/>
    </div>
  )
}

export default Home