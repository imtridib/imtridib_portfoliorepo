import { useTheme } from '../../../hooks/useTheme'
import { MoonIcon, SunIcon } from '../../../icons'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      className="dock-item"
      data-label={next === 'light' ? 'Light mode' : 'Dark mode'}
      aria-label={`Switch to ${next} mode`}
    >
      <span className="dock-icon">{theme === 'dark' ? <SunIcon /> : <MoonIcon />}</span>
    </button>
  )
}
