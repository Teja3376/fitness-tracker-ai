'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ScanlineOverlay } from '@/components/cyber'
import { DesktopSidebar } from '@/components/navigation/desktop-sidebar'
import { MobileNav } from '@/components/navigation/mobile-nav'
import { DashboardHeader } from '@/components/navigation/dashboard-header'
import { AlertsPanel } from '@/components/navigation/alerts-panel'
import { HomeView } from '@/components/dashboard/home-view'
import { WorkoutView } from '@/components/dashboard/workout-view'
import { WorkoutDetailView } from '@/components/dashboard/workout-detail-view'
import { DietView } from '@/components/dashboard/diet-view'
import { MealDetailView } from '@/components/dashboard/meal-detail-view'
import { ProgressView } from '@/components/dashboard/progress-view'
import { ProfileView } from '@/components/dashboard/profile-view'

type ViewState = 
  | { type: 'home' }
  | { type: 'workout' }
  | { type: 'workout-detail'; id: string }
  | { type: 'diet' }
  | { type: 'meal-detail'; id: string }
  | { type: 'progress' }
  | { type: 'profile' }

export function DashboardPage() {
  const [currentView, setCurrentView] = useState<ViewState>({ type: 'home' })
  const [isAlertsOpen, setIsAlertsOpen] = useState(false)
  const [alertCount, setAlertCount] = useState(3)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  
  const getActiveTab = () => {
    switch (currentView.type) {
      case 'home': return 'home'
      case 'workout':
      case 'workout-detail': return 'workout'
      case 'diet':
      case 'meal-detail': return 'diet'
      case 'progress': return 'progress'
      case 'profile': return 'profile'
      default: return 'home'
    }
  }

  const handleTabChange = (tab: string) => {
    switch (tab) {
      case 'home': setCurrentView({ type: 'home' }); break
      case 'workout': setCurrentView({ type: 'workout' }); break
      case 'diet': setCurrentView({ type: 'diet' }); break
      case 'progress': setCurrentView({ type: 'progress' }); break
      case 'profile': setCurrentView({ type: 'profile' }); break
    }
  }

  const handleNavigate = (tab: string, id?: string) => {
    if (tab === 'workout-detail' && id) {
      setCurrentView({ type: 'workout-detail', id })
    } else if (tab === 'meal-detail' && id) {
      setCurrentView({ type: 'meal-detail', id })
    } else {
      handleTabChange(tab)
    }
  }

  const getTitle = () => {
    switch (currentView.type) {
      case 'home': return 'Dashboard'
      case 'workout': return 'Workouts'
      case 'workout-detail': return 'Workout Details'
      case 'diet': return 'Nutrition'
      case 'meal-detail': return 'Meal Details'
      case 'progress': return 'Analytics'
      case 'profile': return 'Profile'
      default: return 'Dashboard'
    }
  }

  const renderView = () => {
    switch (currentView.type) {
      case 'home':
        return <HomeView onNavigate={handleNavigate} />
      case 'workout':
        return <WorkoutView onSelectWorkout={(id) => setCurrentView({ type: 'workout-detail', id })} />
      case 'workout-detail':
        return <WorkoutDetailView workoutId={currentView.id} onBack={() => setCurrentView({ type: 'workout' })} />
      case 'diet':
        return <DietView onSelectMeal={(id) => setCurrentView({ type: 'meal-detail', id })} />
      case 'meal-detail':
        return <MealDetailView mealId={currentView.id} onBack={() => setCurrentView({ type: 'diet' })} />
      case 'progress':
        return <ProgressView />
      case 'profile':
        return <ProfileView />
      default:
        return <HomeView onNavigate={handleNavigate} />
    }
  }

  return (
    <div className="min-h-screen bg-background cyber-grid-bg">
      <ScanlineOverlay />
      
      {/* Desktop Sidebar */}
      <DesktopSidebar 
        activeTab={getActiveTab()} 
        onTabChange={handleTabChange}
        alertCount={alertCount}
        onAlertsClick={() => setIsAlertsOpen(true)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      
      {/* Mobile Header */}
      <DashboardHeader 
        title={getTitle()} 
        alertCount={alertCount}
        onAlertsClick={() => setIsAlertsOpen(true)}
      />
      
      {/* Main Content */}
      <main className={`pb-24 lg:pb-8 transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        <div className="max-w-5xl mx-auto px-4 py-6 lg:px-8 lg:py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView.type + ('id' in currentView ? currentView.id : '')}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      
      {/* Mobile Bottom Nav */}
      <MobileNav activeTab={getActiveTab()} onTabChange={handleTabChange} />

      {/* Alerts Panel - Desktop */}
      <div className="hidden lg:block">
        <AlertsPanel 
          isOpen={isAlertsOpen} 
          onClose={() => setIsAlertsOpen(false)}
          isMobile={false}
        />
      </div>

      {/* Alerts Panel - Mobile */}
      <div className="lg:hidden">
        <AlertsPanel 
          isOpen={isAlertsOpen} 
          onClose={() => setIsAlertsOpen(false)}
          isMobile={true}
        />
      </div>
    </div>
  )
}
