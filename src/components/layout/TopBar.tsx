// import { navItems } from '../../data/navItems'

// export default function TopBar() {
//   return (
//     <header className="absolute inset-x-0 top-0 flex h-24 items-center justify-between px-6 lg:px-[60px]">
//       <a href="#home" className="font-display text-[32px] font-normal lowercase leading-normal tracking-[-0.01em] text-muted">
//         Tridib Chakraborty
//       </a>
//       <nav aria-label="Top links" className="hidden gap-8 md:flex">
//         {navItems
//           .filter((n) => n.id !== 'home')
//           .map((n) => (
//             <a key={n.id} href={`#${n.id}`} className="font-ui text-base font-medium tracking-[-0.03em] text-muted hover:text-accent">
//               {n.label}
//             </a>
//           ))}
//       </nav>
//     </header>
//   )
// }

// // improvised

// import { navItems, cvLink } from '../../data/navItems'
// import { DownloadIcon } from '../../icons'

// export default function TopBar() {
//   return (
//     <header className="absolute inset-x-0 top-0 flex h-24 items-center justify-between px-6 lg:px-[60px]">
//       <a href="#home" className="font-display text-[32px] font-normal lowercase leading-normal tracking-[-0.01em] text-muted">
//         robert garcia
//       </a>

//       <div className="flex items-center gap-8">
//         <nav aria-label="Top links" className="hidden gap-8 md:flex">
//           {navItems
//             .filter((n) => n.id !== 'home')
//             .map((n) => (
//               <a key={n.id} href={`#${n.id}`} className="font-ui text-base font-medium tracking-[-0.03em] text-muted hover:text-accent">
//                 {n.label}
//               </a>
//             ))}
//         </nav>

//         {/* Download CV: text first, download icon after */}
//         <a
//           href={cvLink.href}
//           download={cvLink.fileName}
//           className="group inline-flex items-center gap-2 rounded-full border border-accent px-3 py-2 font-ui text-sm font-medium text-accent transition-colors duration-300 hover:bg-primary hover:text-ink sm:px-4 sm:text-base"
//         >
//           {cvLink.label}
//           <DownloadIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
//         </a>
//       </div>
//     </header>
//   )
// }




// 3rd improvised version
import { navItems, cvLink } from '../../data/navItems'
import { DownloadIcon } from '../../icons'

export default function TopBar({ onOpenCv }: { onOpenCv: () => void }) {
  return (
    <header className="absolute inset-x-0 top-0 flex h-24 items-center justify-between px-6 lg:px-[60px]">
      <a href="#home" className="font-display text-[32px] font-normal lowercase leading-normal tracking-[-0.01em] text-muted">
        Tridib Chakraborty
      </a>

      <div className="flex items-center gap-8">
        <nav aria-label="Top links" className="hidden gap-8 md:flex">
          {navItems
            .filter((n) => n.id !== 'home')
            .map((n) => (
              <a key={n.id} href={`#${n.id}`} className="font-ui text-base font-medium tracking-[-0.03em] text-muted hover:text-accent">
                {n.label}
              </a>
            ))}
        </nav>

        {/* Opens the CV pop-up. Phones show a short "My CV" label. */}
        <button
          type="button"
          onClick={onOpenCv}
          aria-haspopup="dialog"
          aria-label={cvLink.label}
          className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-accent px-4 py-2 font-ui text-sm font-medium text-accent transition-colors duration-300 hover:bg-primary hover:text-ink sm:text-base"
        >
          <span className="sm:hidden">My CV</span>
          <span className="hidden sm:inline">{cvLink.label}</span>
          <DownloadIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
        </button>
      </div>
    </header>
  )
}