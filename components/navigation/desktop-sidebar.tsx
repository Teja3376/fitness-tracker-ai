'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { 
  HomeIcon, 
  WorkoutIcon, 
  DietIcon, 
  AnalyticsIcon, 
  UserIcon,
  AlertIcon,
  GlitchText 
} from '@/components/cyber'
import Link from 'next/link'

interface DesktopSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  alertCount?: number
  onAlertsClick?: () => void
  isCollapsed?: boolean
  onToggleCollapse?: () => void
}

const navItems = [
  { id: 'home', label: 'Dashboard', icon: HomeIcon },
  { id: 'workout', label: 'Workouts', icon: WorkoutIcon },
  { id: 'diet', label: 'Meals', icon: DietIcon },
  { id: 'progress', label: 'Analytics', icon: AnalyticsIcon },
  { id: 'profile', label: 'Profile', icon: UserIcon },
]

export function DesktopSidebar({ 
  activeTab, 
  onTabChange, 
  alertCount = 0, 
  onAlertsClick,
  isCollapsed = false,
  onToggleCollapse 
}: DesktopSidebarProps) {
  return (
    <motion.aside 
      initial={{ x: -100, opacity: 0 }}
      animate={{ 
        x: 0, 
        opacity: 1,
        width: isCollapsed ? 80 : 256 
      }}
      transition={{ duration: 0.3 }}
      className="hidden lg:flex flex-col h-screen bg-card/50 backdrop-blur-sm border-r border-border fixed left-0 top-0 z-40"
    >
      {/* Logo & Collapse Toggle */}
      <div className={cn("p-4 border-b border-border", isCollapsed ? "px-4" : "p-6")}>
        <div className="flex items-center justify-between">
          <Link href="/" className={isCollapsed ? "hidden" : "block"}>
            <GlitchText text="CYBERFIT" as="h1" className="text-2xl font-bold" />
          </Link>
          {isCollapsed && (
            <Link href="/" className="mx-auto">
              <span className="text-2xl font-bold text-primary">CF</span>
            </Link>
          )}
        </div>
        {!isCollapsed && (
          <p className="text-xs text-muted-foreground mt-1 font-mono">
            Neural Enhancement v2.077
          </p>
        )}
        
        {/* Collapse Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onToggleCollapse}
          className={cn(
            "mt-3 p-2 rounded-sm bg-muted/50 hover:bg-muted transition-colors",
            isCollapsed ? "mx-auto" : "ml-auto block"
          )}
        >
          <motion.svg 
            className="w-4 h-4 text-muted-foreground"
            animate={{ rotate: isCollapsed ? 180 : 0 }}
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </motion.svg>
        </motion.button>
      </div>

      {/* Alerts Button */}
      <div className={cn("px-3 pt-4", isCollapsed && "px-2")}>
        <motion.button
          whileHover={{ x: isCollapsed ? 0 : 4 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAlertsClick}
          className={cn(
            'w-full flex items-center gap-4 px-4 py-3 rounded-sm transition-all duration-200',
            'font-mono text-sm uppercase tracking-wider',
            'text-foreground hover:bg-primary/10 cyber-border',
            isCollapsed && 'justify-center px-2'
          )}
        >
          <div className="relative">
            <AlertIcon className="w-5 h-5 text-primary" />
            {alertCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 min-w-[16px] h-[16px] bg-secondary text-[9px] font-bold flex items-center justify-center rounded-full"
              >
                {alertCount > 9 ? '9+' : alertCount}
              </motion.span>
            )}
          </div>
          {!isCollapsed && <span>Alerts</span>}
          {!isCollapsed && alertCount > 0 && (
            <span className="ml-auto text-xs text-secondary">{alertCount} new</span>
          )}
        </motion.button>
      </div>
      
      {/* Navigation */}
      <nav className={cn("flex-1 p-3 space-y-2", isCollapsed && "p-2")}>
        {navItems.map((item, index) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          
          return (
            <motion.button
              key={item.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onTabChange(item.id)}
              whileHover={{ x: isCollapsed ? 0 : 4 }}
              whileTap={{ scale: 0.98 }}
              title={isCollapsed ? item.label : undefined}
              className={cn(
                'w-full flex items-center gap-4 px-4 py-3 rounded-sm transition-all duration-200',
                'font-mono text-sm uppercase tracking-wider',
                isActive 
                  ? 'bg-primary/10 text-primary cyber-border' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
                isCollapsed && 'justify-center px-2'
              )}
            >
              <Icon className={cn('w-5 h-5', isActive && 'text-primary')} />
              {!isCollapsed && <span>{item.label}</span>}
              {!isCollapsed && isActive && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="ml-auto w-1 h-6 bg-primary"
                />
              )}
            </motion.button>
          )
        })}
      </nav>
      
      {/* User section */}
      <div className={cn("p-4 border-t border-border space-y-3", isCollapsed && "p-2")}>
        {!isCollapsed ? (
          <>
            <div className="flex items-center gap-3 p-3 bg-muted/30 cyber-clip-sm">
              <div className="w-10 h-10 rounded-sm bg-primary/20 flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-mono text-sm truncate">V_Runner</p>
                <p className="text-xs text-muted-foreground">Level 12</p>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
            
            <Link href="/">
              <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center gap-4 px-4 py-3 rounded-sm transition-all duration-200 font-mono text-sm uppercase tracking-wider text-secondary hover:bg-secondary/10 cyber-border-red"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </motion.button>
            </Link>
          </>
        ) : (
          <>
            <div className="flex justify-center p-2 bg-muted/30 rounded-sm">
              <div className="w-10 h-10 rounded-sm bg-primary/20 flex items-center justify-center relative">
                <UserIcon className="w-5 h-5 text-primary" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </div>
            </div>
            
            <Link href="/" className="block">
              <motion.button
                whileTap={{ scale: 0.98 }}
                title="Logout"
                className="w-full flex justify-center p-3 rounded-sm text-secondary hover:bg-secondary/10 cyber-border-red"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </motion.button>
            </Link>
          </>
        )}
      </div>
    </motion.aside>
  )
}
