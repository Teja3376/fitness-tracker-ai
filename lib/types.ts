export type TabId = 'workout' | 'diet' | 'progress' | 'reminders'

export interface Exercise {
  id: string
  name: string
  sets: number
  reps: string
  rest: string
  muscleGroup: string
  completed?: boolean
}

export interface WorkoutPlan {
  id: string
  name: string
  description: string
  duration: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  exercises: Exercise[]
  calories: number
  isCustom?: boolean
}

export interface Meal {
  id: string
  name: string
  time: string
  calories: number
  protein: number
  carbs: number
  fats: number
  items: string[]
}

export interface DietPlan {
  id: string
  name: string
  description: string
  targetCalories: number
  meals: Meal[]
  isCustom?: boolean
}

export interface ProgressEntry {
  date: string
  weight: number
  bodyFat?: number
  workoutsCompleted: number
  caloriesConsumed: number
  caloriesBurned: number
}

export interface Reminder {
  id: string
  title: string
  time: string
  days: string[]
  type: 'workout' | 'meal' | 'water' | 'sleep'
  enabled: boolean
}

export interface UserStats {
  currentStreak: number
  totalWorkouts: number
  totalCaloriesBurned: number
  weightChange: number
  weeklyGoal: number
  weeklyProgress: number
}
