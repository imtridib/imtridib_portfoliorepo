// import TopBar from './components/layout/TopBar'
// import Dock from './components/layout/Dock/Dock'
// import Hero from './components/sections/Hero'
// import Projects from './components/sections/Projects'
// import Research from './components/sections/Research'
// import About from './components/sections/About'
// import Contact from './components/sections/Contact'

// export default function App() {
//   return (
//     <>
//       <TopBar />
//       <main>
//         <Hero />
//         <Projects />
//         <Research />
//         <About />
//         <Contact />
//       </main>
//       <Dock />
//     </>
//   )
// }
import { useState } from 'react'
import TopBar from './components/layout/TopBar'
import Dock from './components/layout/Dock/Dock'
import CvModal from './components/ui/CvModal'
import Hero from './components/sections/Hero'
import Projects from './components/sections/Projects'
import Research from './components/sections/Research'
import About from './components/sections/About'
import Contact from './components/sections/Contact'

export default function App() {
  // One place decides if the CV pop-up is open, so the top bar AND the dock can open it
  const [cvOpen, setCvOpen] = useState(false)
  const openCv = () => setCvOpen(true)

  return (
    <>
      <TopBar onOpenCv={openCv} />
      <main>
        <Hero />
        <Projects />
        <Research />
        <About />
        <Contact />
      </main>
      <Dock onOpenCv={openCv} />
      <CvModal open={cvOpen} onClose={() => setCvOpen(false)} />
    </>
  )
}