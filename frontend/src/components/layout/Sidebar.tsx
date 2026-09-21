import {
  Activity,
  Beaker,
  BrainCircuit,
  ChartNoAxesCombined,
  ExternalLink,
  Filter,
  Fingerprint,
  Gauge,
  Github,
  Settings,
  UsersRound,
  X,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { BRAND } from '@/config/brand'
import { cn } from '@/lib/utils'

const items = [
  ['Overview', '/', Gauge],
  ['Product Metrics', '/metrics', Activity],
  ['Funnel', '/funnel', Filter],
  ['Cohorts', '/cohorts', UsersRound],
  ['Churn', '/churn', BrainCircuit],
  ['Experiments', '/experiments', Beaker],
  ['Model Health', '/model-health', Fingerprint],
  ['Settings', '/settings', Settings],
] as const

type SidebarContentProps = {
  onNavigate?: () => void
  mobile?: boolean
}

function SidebarContent({
  onNavigate,
  mobile = false,
}: SidebarContentProps) {
  return (
    <>
      <div className="mb-7 flex items-start gap-2 px-2">
        <div className="rounded-xl bg-primary p-2 text-white">
          <ChartNoAxesCombined className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-semibold">
            {BRAND.productName}
          </p>

          <p className="text-xs leading-4 opacity-50">
            {BRAND.productTagline}
          </p>
        </div>

        {mobile && (
          <button
            type="button"
            onClick={onNavigate}
            className="rounded-lg border p-2 transition hover:bg-muted"
            aria-label="Close navigation"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto">
        {items.map(([label, to, Icon]) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition hover:bg-muted',
                isActive &&
                  'bg-primary text-white hover:bg-primary',
              )
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-6 border-t pt-4">
        <p className="px-2 text-[10px] font-medium uppercase tracking-[0.18em] opacity-40">
          Engineering portfolio
        </p>

        <p className="mt-2 px-2 text-sm font-semibold">
          {BRAND.ownerName}
        </p>

        <p className="px-2 text-xs opacity-50">
          {BRAND.ownerTitle}
        </p>

        <div className={mobile ? "mt-3 grid grid-cols-2 gap-2" : "hidden"}>
          <a
            href={BRAND.portfolioUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-xl border px-2 py-2 text-xs transition hover:bg-muted"
          >
            Portfolio
            <ExternalLink className="h-3 w-3" />
          </a>

          <a
            href={BRAND.repositoryUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-xl border px-2 py-2 text-xs transition hover:bg-muted"
          >
            <Github className="h-3.5 w-3.5" />
            GitHub
          </a>
        </div>
      </div>
    </>
  )
}

type SidebarProps = {
  mobileOpen?: boolean
  onMobileClose?: () => void
}

export function Sidebar({
  mobileOpen = false,
  onMobileClose,
}: SidebarProps) {
  return (
    <>
      <aside className="hidden h-screen w-64 shrink-0 flex-col border-r bg-card/70 p-4 lg:flex">
        <SidebarContent />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={onMobileClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <aside className="relative z-10 flex h-full w-[min(86vw,18rem)] flex-col border-r bg-card p-4 shadow-2xl">
            <SidebarContent
              mobile
              onNavigate={onMobileClose}
            />
          </aside>
        </div>
      )}
    </>
  )
}
