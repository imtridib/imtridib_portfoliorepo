// import { useRef, useState } from 'react'
// import { navItems, sectionIds } from '../../../data/navItems'
// import { useActiveSection } from '../../../hooks/useActiveSection'
// import { useDockMagnify } from '../../../hooks/useDockMagnify'
// import { DownloadIcon } from '../../../icons'
// import CvModal from '../../ui/CvModal'
// import DockItem from './DockItem'
// import ThemeToggle from './ThemeToggle'

// export default function Dock() {
//   const active = useActiveSection(sectionIds)
//   const dockRef = useRef<HTMLElement>(null)
//   const [cvOpen, setCvOpen] = useState(false)
//   useDockMagnify(dockRef)

//   return (
//     <>
//       <div className="dock-wrap">
//         <nav ref={dockRef} className="dock" aria-label="Main navigation">
//           {navItems.map((item) => (
//             <DockItem key={item.id} item={item} active={active === item.id} />
//           ))}

//           {/* CV: opens the pop-up viewer */}
//           <button
//             type="button"
//             className="dock-item"
//             data-label="View my CV"
//             aria-label="View my CV"
//             aria-haspopup="dialog"
//             onClick={() => setCvOpen(true)}
//           >
//             <span className="dock-icon">
//               <DownloadIcon />
//             </span>
//           </button>

//           <span className="dock-sep" aria-hidden="true" />
//           <ThemeToggle />
//         </nav>
//       </div>

//       <CvModal open={cvOpen} onClose={() => setCvOpen(false)} />
//     </>
//   )
// }


import { useRef } from 'react'
import { navItems, sectionIds } from '../../../data/navItems'
import { useActiveSection } from '../../../hooks/useActiveSection'
import { useDockMagnify } from '../../../hooks/useDockMagnify'
import { DownloadIcon } from '../../../icons'
import DockItem from './DockItem'
import ThemeToggle from './ThemeToggle'

export default function Dock({ onOpenCv }: { onOpenCv: () => void }) {
  const active = useActiveSection(sectionIds)
  const dockRef = useRef<HTMLElement>(null)
  useDockMagnify(dockRef)

  return (
    <div className="dock-wrap">
      <nav ref={dockRef} className="dock" aria-label="Main navigation">
        {navItems.map((item) => (
          <DockItem key={item.id} item={item} active={active === item.id} />
        ))}

        {/* CV: opens the pop-up viewer */}
        <button
          type="button"
          className="dock-item"
          data-label="View my CV"
          aria-label="View my CV"
          aria-haspopup="dialog"
          onClick={onOpenCv}
        >
          <span className="dock-icon">
            <DownloadIcon />
          </span>
        </button>

        <span className="dock-sep" aria-hidden="true" />
        <ThemeToggle />
      </nav>
    </div>
  )
}