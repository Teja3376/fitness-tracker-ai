import type { WorkoutPlan, DietPlan, ProgressEntry, Reminder, UserStats } from './types'

export const workoutPlans: WorkoutPlan[] = [
  {
    id: 'w1',
    name: 'NEURAL BURN',
    description: 'High-intensity full body assault for maximum chrome enhancement',
    duration: '45 min',
    difficulty: 'Advanced',
    calories: 450,
    exercises: [
      { id: 'e1', name: 'Barbell Squats', sets: 4, reps: '8-10', rest: '90s', muscleGroup: 'Legs' },
      { id: 'e2', name: 'Bench Press', sets: 4, reps: '8-10', rest: '90s', muscleGroup: 'Chest' },
      { id: 'e3', name: 'Deadlifts', sets: 3, reps: '6-8', rest: '120s', muscleGroup: 'Back' },
      { id: 'e4', name: 'Military Press', sets: 3, reps: '10-12', rest: '60s', muscleGroup: 'Shoulders' },
      { id: 'e5', name: 'Pull-ups', sets: 3, reps: 'Max', rest: '60s', muscleGroup: 'Back' },
    ],
  },
  {
    id: 'w2',
    name: 'CHROME ARMS',
    description: 'Arm-focused session for mantis blade compatibility',
    duration: '35 min',
    difficulty: 'Intermediate',
    calories: 280,
    exercises: [
      { id: 'e6', name: 'Bicep Curls', sets: 4, reps: '12-15', rest: '45s', muscleGroup: 'Biceps' },
      { id: 'e7', name: 'Tricep Dips', sets: 4, reps: '12-15', rest: '45s', muscleGroup: 'Triceps' },
      { id: 'e8', name: 'Hammer Curls', sets: 3, reps: '10-12', rest: '45s', muscleGroup: 'Biceps' },
      { id: 'e9', name: 'Skull Crushers', sets: 3, reps: '10-12', rest: '45s', muscleGroup: 'Triceps' },
    ],
  },
  {
    id: 'w3',
    name: 'REFLEX BOOST',
    description: 'Cardio and agility for enhanced sandevistan response',
    duration: '30 min',
    difficulty: 'Beginner',
    calories: 320,
    exercises: [
      { id: 'e10', name: 'Jump Rope', sets: 3, reps: '3 min', rest: '30s', muscleGroup: 'Cardio' },
      { id: 'e11', name: 'Box Jumps', sets: 4, reps: '15', rest: '45s', muscleGroup: 'Legs' },
      { id: 'e12', name: 'Burpees', sets: 3, reps: '15', rest: '60s', muscleGroup: 'Full Body' },
      { id: 'e13', name: 'Mountain Climbers', sets: 3, reps: '30', rest: '30s', muscleGroup: 'Core' },
    ],
  },
  {
    id: 'w4',
    name: 'CORE MATRIX',
    description: 'Abdominal fortress for titanium spine support',
    duration: '25 min',
    difficulty: 'Intermediate',
    calories: 200,
    exercises: [
      { id: 'e14', name: 'Plank Hold', sets: 3, reps: '60s', rest: '30s', muscleGroup: 'Core' },
      { id: 'e15', name: 'Russian Twists', sets: 4, reps: '20', rest: '30s', muscleGroup: 'Obliques' },
      { id: 'e16', name: 'Leg Raises', sets: 3, reps: '15', rest: '45s', muscleGroup: 'Lower Abs' },
      { id: 'e17', name: 'Dead Bug', sets: 3, reps: '12', rest: '30s', muscleGroup: 'Core' },
    ],
  },
]

export const dietPlans: DietPlan[] = [
  {
    id: 'd1',
    name: 'COMBAT FUEL',
    description: 'High protein diet for maximum muscle synthesis',
    targetCalories: 2400,
    meals: [
      {
        id: 'm1',
        name: 'Morning Protocol',
        time: '07:00',
        calories: 550,
        protein: 40,
        carbs: 45,
        fats: 20,
        items: ['Protein Oatmeal', 'Scrambled Eggs', 'Avocado Toast'],
      },
      {
        id: 'm2',
        name: 'Midday Refuel',
        time: '12:00',
        calories: 700,
        protein: 50,
        carbs: 60,
        fats: 25,
        items: ['Grilled Chicken', 'Brown Rice', 'Steamed Vegetables'],
      },
      {
        id: 'm3',
        name: 'Afternoon Boost',
        time: '16:00',
        calories: 350,
        protein: 30,
        carbs: 25,
        fats: 15,
        items: ['Protein Shake', 'Banana', 'Almonds'],
      },
      {
        id: 'm4',
        name: 'Evening Recovery',
        time: '19:30',
        calories: 650,
        protein: 45,
        carbs: 50,
        fats: 25,
        items: ['Salmon Fillet', 'Sweet Potato', 'Green Salad'],
      },
    ],
  },
  {
    id: 'd2',
    name: 'LEAN PROTOCOL',
    description: 'Calorie deficit for shredding excess mass',
    targetCalories: 1800,
    meals: [
      {
        id: 'm5',
        name: 'Morning Protocol',
        time: '08:00',
        calories: 400,
        protein: 35,
        carbs: 30,
        fats: 15,
        items: ['Greek Yogurt', 'Berries', 'Protein Granola'],
      },
      {
        id: 'm6',
        name: 'Midday Refuel',
        time: '13:00',
        calories: 550,
        protein: 45,
        carbs: 40,
        fats: 18,
        items: ['Turkey Wrap', 'Mixed Greens', 'Hummus'],
      },
      {
        id: 'm7',
        name: 'Evening Recovery',
        time: '18:30',
        calories: 500,
        protein: 40,
        carbs: 35,
        fats: 18,
        items: ['Grilled Fish', 'Quinoa', 'Asparagus'],
      },
    ],
  },
]

export const progressData: ProgressEntry[] = [
  { date: '2026-01-25', weight: 82, bodyFat: 18, workoutsCompleted: 5, caloriesConsumed: 2300, caloriesBurned: 450 },
  { date: '2026-01-26', weight: 81.8, bodyFat: 17.8, workoutsCompleted: 6, caloriesConsumed: 2250, caloriesBurned: 380 },
  { date: '2026-01-27', weight: 81.5, bodyFat: 17.5, workoutsCompleted: 7, caloriesConsumed: 2400, caloriesBurned: 520 },
  { date: '2026-01-28', weight: 81.3, bodyFat: 17.3, workoutsCompleted: 8, caloriesConsumed: 2200, caloriesBurned: 0 },
  { date: '2026-01-29', weight: 81.0, bodyFat: 17.0, workoutsCompleted: 9, caloriesConsumed: 2350, caloriesBurned: 480 },
  { date: '2026-01-30', weight: 80.8, bodyFat: 16.8, workoutsCompleted: 10, caloriesConsumed: 2280, caloriesBurned: 420 },
  { date: '2026-01-31', weight: 80.5, bodyFat: 16.5, workoutsCompleted: 11, caloriesConsumed: 2320, caloriesBurned: 500 },
]

export const reminders: Reminder[] = [
  { id: 'r1', title: 'Morning Workout', time: '06:30', days: ['Mon', 'Wed', 'Fri'], type: 'workout', enabled: true },
  { id: 'r2', title: 'Breakfast', time: '07:30', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], type: 'meal', enabled: true },
  { id: 'r3', title: 'Hydration Check', time: '10:00', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], type: 'water', enabled: true },
  { id: 'r4', title: 'Lunch Time', time: '12:30', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], type: 'meal', enabled: true },
  { id: 'r5', title: 'Evening Training', time: '18:00', days: ['Tue', 'Thu', 'Sat'], type: 'workout', enabled: false },
  { id: 'r6', title: 'Sleep Protocol', time: '22:30', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], type: 'sleep', enabled: true },
]

export const userStats: UserStats = {
  currentStreak: 12,
  totalWorkouts: 47,
  totalCaloriesBurned: 18500,
  weightChange: -3.2,
  weeklyGoal: 5,
  weeklyProgress: 4,
}
