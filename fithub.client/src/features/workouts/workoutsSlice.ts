  import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Workout } from "./types"; // Removed Exercise import

// Thunk for fetching workouts
export const fetchWorkouts = createAsyncThunk(
  "workouts/fetchWorkouts",
  async (_, { rejectWithValue }) => {
    try {
      console.log('Attempting to fetch workouts from API...');
      const response = await axios.get("http://localhost:5012/api/Workout/get-all-workouts", { withCredentials: true });
      console.log('Fetch workouts response status:', response.status);
      console.log('Fetch workouts response data:', response.data);
      // Validate response data structure here if necessary
      return response.data as Workout[]; // Assert type
    } catch (error: unknown) {
      let errorMessage = 'Failed to fetch workouts';
      if (axios.isAxiosError(error) && error.response?.data) {
        const data = error.response.data;
        errorMessage = typeof data === 'string' ? data : JSON.stringify(data);
        console.error('Error fetching workouts:', errorMessage);
      } else if (error instanceof Error) {
        errorMessage = error.message;
        console.error('Error fetching workouts:', errorMessage);
      }
      return rejectWithValue(errorMessage);
    }
  }
);

// Thunk for saving a workout
export const saveWorkout = createAsyncThunk(
  'workouts/saveWorkout',
  async (newWorkout: Omit<Workout, 'id'>, { rejectWithValue }) => {
    try {
      console.log('Attempting to save workout to API...', newWorkout);
      const response = await axios.post("http://localhost:5012/api/Workout/add-workout", newWorkout, { withCredentials: true });
      console.log('Save workout response status:', response.status);
      console.log('Save workout response data:', response.data);
      return response.data as Workout;
    } catch (error: unknown) {
      let errorMessage = 'Failed to save workout';
      if (axios.isAxiosError(error) && error.response?.data) {
        const data = error.response.data;
        errorMessage = typeof data === 'string' ? data :
                       (typeof data === 'object' && data !== null && 'message' in data && typeof (data as { message: unknown }).message === 'string') ? (data as { message: string }).message :
                       JSON.stringify(data);
        console.error('Error saving workout:', errorMessage);
      } else if (error instanceof Error) {
        errorMessage = error.message;
        console.error('Error saving workout:', errorMessage);
      }
      return rejectWithValue(errorMessage);
    }
  }
);

interface WorkoutsState {
  workouts: Workout[];
  selectedWorkout: Workout | null;
  loading: boolean;
  error: string | null;
}

// Minimal initial state, rely on fetchWorkouts
const initialState: WorkoutsState = {
  workouts: [
    {
      id: '1',
      name: 'Full Body Mobility & Strength',
      description: 'A dynamic routine to improve mobility and build foundational strength using bodyweight and dumbbells.',
      shortDescription: 'Includes T-Spine rotations, toe-touch squats, deadlifts, rows, presses, and core holds.',
      difficulty: 'intermediate',
      duration: 45,
      equipment: ['bodyweight', 'dumbbells'],
      gif: 'workout1.png',
      exercises: [
        {
          id: 'w1e1',
          name: 'T-Spine Rotation to Downward Dog',
          description: `1. Start in pushup position.\n2. Keeping your left leg straight, place your right foot just outside your right hand. Hold.\n3. Lift your right arm and reach for the ceiling. Hold, then return to pushup position.\n4. Shift your feet forward slightly, then raise your hips high. Try to form a straight line from your hands through your hips while also trying to keep your legs straight.\n5. Hold, then return to the start. That’s 1 rep.`,
          gif: '/exercise/DownwardDog.gif',
        },
        {
          id: 'w1e2',
          name: 'Toe-Touch Squat',
          description: `1. Start standing, feet about shoulder-width apart, arms held in front of you.\n2. Keeping your back flat, bend your knees slightly and hinge forward at your hips until your hands touch your toes.\n3. When they do, bend at the knees so you finish in a low squat position.\n4. Reach your arms overhead.\n5. Stand back up. That’s 1 rep.`,
          gif: '/exercise/TSquat.gif',
        },
        {
          id: 'w1e3',
          name: 'Dumbbell Romanian Deadlift',
          description: `1. Stand holding medium-weight dumbbells at your sides, feet hip-width apart, core braced, knees slightly bent.\n2. Hinge at your hips and push your butt backward, lowering your torso.\n3. Hinge until you feel a slight stretch in your hamstrings.\n4. Pause, then stand up, squeezing your glutes. That’s 1 rep; do 12.`,
          gif: '/exercise/RDeadlift.gif',
          sets: 1,
          reps: 12,
        },
        {
          id: 'w1e4',
          name: 'Alternating Dumbbell Row',
          description: `1. Stand holding medium-weight dumbbells. Hinge at your hips until your torso is almost parallel to the floor.\n2. Squeeze your shoulder blades and row the right dumbbell to your chest.\n3. Lower it and repeat with the left dumbbell. That’s 1 rep; do 12.`,
          gif: '/exercise/AltDumbbell.gif',
          sets: 1,
          reps: 12,
        },
        {
          id: 'w1e5',
          name: 'Side-Plank Press',
          description: `1. Start in a left-side plank, your left elbow on the floor and your torso and hips tight, a light dumbbell in front of you.\n2. Grasp the dumbbell with your right hand. Continue pressing your hips upward as you lift the dumbbell off the floor and pull it close to your right pec.\n3. Press it toward the ceiling, then return it to the floor. That’s 1 rep; do 12 per side.`,
          gif: '/exercise/SidePress.gif',
          sets: 1,
          reps: 12,
        },
        {
          id: 'w1e6',
          name: 'Glute Bridge Floor Press',
          description: `1. Lie on the floor holding medium-weight dumbbells, upper arms on the floor, elbows bent 90 degrees.\n2. Tighten your glutes and push your hips upward.\n3. Press the dumbbells upward.\n4. Pause, then lower them back to the start. That’s 1 rep; do 12.`,
          gif: '/exercise/GlutePress.gif',
          sets: 1,
          reps: 12,
        },
        {
          id: 'w1e7',
          name: 'Bulgarian Split Squat',
          description: `1. Place your right foot on a bench or box that’s about knee height, bending your knee slightly, and step your left foot about 18 inches away. Your left leg should be almost straight.\n2. Hold medium-weight dumbbells at your shoulders. Bend your left knee, sitting back; your right knee will bend more as you do this and nearly touch the floor.\n3. Hold when your left thigh is parallel to the floor, then stand back up. That’s 1 rep; do 12 per side.`,
          gif: 'BulgSquat.gif',
          sets: 1,
          reps: 12,
        },
        {
          id: 'w1e8',
          name: 'Hollow Body Hold',
          description: `1. Start lying on your back, arms and legs extended.\n2. Tighten your abs, pressing your lower back into the floor as you do so. This should lift your legs off the floor; work to keep them straight.\n3. Lift your shoulder blades off the floor as well; keep extending your arms back as you do this.\n4. Hold for 30 seconds. That’s 1 rep; do 3 to 5.`,
          gif: 'BodyHold.gif',
          sets: 3,
          duration: 30,
        },
      ],
    },
    {
      id: '2',
      name: 'Beginner Bodyweight Basics',
      description: 'A perfect starter workout for beginners focusing on fundamental movement patterns using just your bodyweight.',
      shortDescription: 'Simple bodyweight exercises to build strength and confidence for beginners.',
      difficulty: 'beginner',
      duration: 30,
      equipment: ['bodyweight'],
      gif: 'workout2.jpg',
      exercises: [
        {
          id: 'w2e1',
          name: 'Push Ups (Slow and Fast Tempo)',
          description: `1. Start in a high plank, shoulders over wrists, core tight, legs straight.\n2. Do two slow push ups: lower for 2 counts, rise for 2 counts.\n3. Then do two fast push ups: down for 1 count, up for 1 count.\n4. Alternate slow and fast push ups for 40 seconds. Modification: Use a bench or do knee push ups.`,
          gif: 'slow-and-fast-push-ups.gif',
          duration: 40,
        },
        {
          id: 'w2e2',
          name: 'Runner Lunge',
          description: `1. Stand staggered: right foot front, left toes back.\n2. Step the left leg into a reverse lunge.\n3. Tap the left foot next to the right without standing up.\n4. Step back into a lunge, then stand tall.\n5. Repeat on one side, switch legs next set.`,
          gif: 'runner-lunges-bodyweight-workout.gif',
        },
        {
          id: 'w2e3',
          name: 'Side Plank and Reach',
          description: `1. Start in a right forearm side plank.\n2. Reach left arm under your body.\n3. Return to start with left arm overhead. That’s one rep. Modification: Drop your right knee or left toes to the ground.`,
          gif: 'side-plank-and-reach-open.gif',
        },
        {
          id: 'w2e4',
          name: 'Sumo Squat and Calf Raise',
          description: `1. Stand wide, toes out, heels in.\n2. Squat down, knees over toes.\n3. At the bottom, lift your heels into a calf raise.\n4. Try to stand while heels stay lifted, then lower.`,
          gif: 'sumo-squat-calf-raisse.gif',
        },
        {
          id: 'w2e5',
          name: 'Hollow Rock Knee Hugs',
          description: `1. Lay flat, arms overhead, lower back pressed to floor.\n2. Raise arms, legs, head, and shoulders off the ground.\n3. Pull right knee in, reach hands to your heel.\n4. Extend the leg back out. Alternate knees. Modification: Keep head down or legs on the floor.`,
          gif: 'hollow-rock-hold-toe-taps.gif',
        },
        {
          id: 'w2e6',
          name: 'Squat and Knee to Elbow Crunch',
          description: `1. Stand with feet shoulder-width apart, hands by your head.\n2. Squat down to 90 degrees.\n3. As you rise, bring your right knee to your left elbow.\n4. Lower the leg and repeat. Alternate sides.`,
          gif: 'squat-and-knee-to-elbow-crunch.gif',
        },
      ],
    },
    {
      id: '3',
      name: 'Advanced Total Body Blast',
      description: 'An intense, comprehensive workout targeting all major muscle groups with varied equipment for maximum results.',
      shortDescription: 'High-intensity training combining bodyweight, dumbbells and machines for advanced fitness enthusiasts.',
      difficulty: 'advanced',
      duration: 60,
      equipment: ['bodyweight', 'dumbbells', 'machines'],
      gif: 'workout3.jpg',
      exercises: [
        {
          id: 'w3e1',
          name: 'Two Back Rows, Clean and Two Uneven Front Squat Thrusters',
          description: `1. Stand with feet shoulder-width apart, knees slightly bent. Hold a dumbbell in your right hand, palm facing in, hanging between your thighs.\n2. Pull your right elbow back to your hip for a row, squeezing your back. Lower with control. Repeat for two rows.\n3. Press through your heels to stand tall and clean the dumbbell to your right shoulder.\n4. Lower into a squat, hips back and knees bent to 90 degrees.\n5. Stand up and press the dumbbell overhead. Repeat for two squat thrusters. Modification: Skip the overhead press and hold the dumbbell at your side during squats.`,
          gif: 'row-squat-press-functional-training-workout.gif',
        },
        {
          id: 'w3e2',
          name: 'Two Staggered Deadlifts and Two Balance Bicep Curls',
          description: `1. Stand with feet hip-width apart. Hold a dumbbell in your right hand, palm facing in.\n2. Step your right foot slightly behind your left, resting on your right toes. Keep 80% of your weight in the front foot.\n3. Hinge at the hips, sliding the dumbbell down your front leg. Keep your back flat and core engaged. Repeat for two deadlifts.\n4. Shift your weight onto your left foot, lifting your right knee until your thigh is parallel to the floor.\n5. Perform two bicep curls while balancing, curling the dumbbell to shoulder height. Modification: Keep both feet on the ground in the staggered stance for curls.`,
          gif: 'staggered-deadlift-and-balance-curl-balance-curl.gif',
        },
        {
          id: 'w3e3',
          name: 'Two Split Lunges and Two Split Lunge with Front Raise',
          description: `1. Stand with feet hip-width apart, holding a dumbbell in each hand, arms at your sides.\n2. Step your right foot back into a lunge. Bend both knees to 90 degrees, keeping your chest upright.\n3. Push through your front heel to return to standing. Repeat for two lunges.\n4. Lunge again and raise the dumbbells to shoulder height as you come up. Repeat for two reps.`,
          gif: 'lunge-front-raise-functional-training-workout.gif',
        },
        {
          id: 'w3e4',
          name: 'Two Lateral Side Step Squats and Two Overhead Tricep Extensions',
          description: `1. Stand with feet wider than hips, holding a dumbbell at your chest with both hands.\n2. Step left and lower into a squat, knees bent and hips back. Keep chest up. Repeat twice.\n3. Stand tall and press the dumbbell overhead.\n4. Bend your elbows to lower the dumbbell behind your head. Straighten your arms to complete a tricep extension. Repeat twice.\n5. Repeat the same steps stepping to the right.`,
          gif: 'squat-walk-and-overhead-triceps.gif',
        },
        {
          id: 'w3e5',
          name: 'Two Snatches and Two Push Ups',
          description: `1. Stand with feet shoulder-width apart, knees slightly bent. Place a dumbbell between your feet.\n2. Hinge at the hips and grab the dumbbell with your right hand.\n3. Drive through your legs to lift and press the dumbbell overhead in one motion. Lock out your arm. Lower with control. Repeat on the left. Do two snatches total.\n4. Place both hands on the floor and step or jump back into a high plank (arms straight, shoulders over wrists, body in a line).\n5. Bend your elbows to lower your chest, then push back up. Do two push ups. Modification: Step to plank and do knee or incline push ups.`,
          gif: 'snatches-and-push-ups-functional-training-workout.gif',
        },
        {
          id: 'w3e6',
          name: 'Shuffle and Two Squat Dumbbell High Pulls',
          description: `1. Place a dumbbell on the ground, feet apart in an athletic stance (knees bent, core tight).\n2. Shuffle right, stop in a squat stance with your right foot near the dumbbell.\n3. Pick up the dumbbell with your left hand, stand and pull it to shoulder height, elbow leading. Lower and repeat for two reps.\n4. Shuffle left and repeat the same steps with your right hand.`,
          gif: 'lateral-hop-dumbbell-pull-functional-training-workout.gif',
        },
      ],
    },
    {
      id: '4',
      name: 'Core & Cardio Circuit',
      description: 'A balanced workout that combines core strengthening exercises with cardio intervals to improve endurance and definition.',
      shortDescription: 'Alternating core exercises and cardio bursts for an efficient full-body workout.',
      difficulty: 'intermediate',
      duration: 40,
      equipment: ['bodyweight'],
      gif: 'workout4.jpg',
      exercises: [
        {
          id: 'w4e1',
          name: 'High Plank',
          description: `1. Begin on all fours, then step your feet back to extend your legs fully.\n2. Place your hands directly under your shoulders, arms straight.\n3. Engage your core, glutes, and quads.\n4. Keep your body in a straight line from head to heels — no sagging or arching.\n5. Hold this position for the desired time, maintaining steady breathing.`,
          gif: 'PlankT.gif',
        },
        {
          id: 'w4e2',
          name: 'Glute Bridges',
          description: `1. Lie on your back with knees bent and feet flat on the floor.\n2. Extend one leg straight up toward the ceiling, keeping the other foot grounded.\n3. Engage your core and squeeze your glutes to lift your hips off the ground.\n4. At the top, your shoulders, hips, and grounded knee should form a straight line.\n5. Lower your hips back to the floor slowly, keeping the raised leg stable.\n6. Repeat on one side, then switch legs.`,
          gif: 'GluteB.gif',
        },
        {
          id: 'w4e3',
          name: 'Push-Up to Forearm Plank',
          description: `1. Begin in a full push-up position with arms extended, hands under shoulders.\n2. Lower down into a push-up, keeping elbows close to your body.\n3. Push back up, then lower your right forearm to the mat, followed by your left, into a forearm plank.\n4. Reverse the movement by placing your right hand on the floor, then your left, returning to high plank.\n5. Repeat the sequence, alternating the leading arm each time.`,
          gif: 'PushPlank.gif',
        },
        {
          id: 'w4e4',
          name: 'Russian Twist',
          description: `1. Sit on the floor with your knees bent and feet hovering above the ground.\n2. Lean back slightly to engage your core, keeping your spine long.\n3. Clasp your hands or hold a weight at your chest.\n4. Twist your torso to the right, bringing your hands beside your hip.\n5. Rotate to the left in the same manner.\n6. Continue alternating sides in a controlled manner.`,
          gif: 'RTwist.gif',
        },
        {
          id: 'w4e5',
          name: 'Push-Up',
          description: `1. Start in a high plank position with hands under shoulders, body in a straight line.\n2. Lower your body toward the floor by bending your elbows at a 45-degree angle.\n3. Keep your core engaged and avoid letting your hips sag.\n4. Push through your palms to return to the starting position.\n5. Repeat for reps or time.`,
          gif: 'Push.gif',
        },
        {
          id: 'w4e6',
          name: 'Reverse Lunge',
          description: `1. Stand tall with your feet hip-width apart.\n2. Step your right foot backward and lower your body until both knees form 90-degree angles.\n3. Push through your left heel to return to standing.\n4. Step your left foot back and repeat the lunge.\n5. Alternate legs each rep, keeping your torso upright.`,
          gif: 'RLunge.gif',
        },
        {
          id: 'w4e7',
          name: 'Mountain Climbers',
          description: `1. Begin in a high plank position with shoulders over wrists.\n2. Drive your right knee toward your chest.\n3. Quickly switch and drive your left knee in while extending the right leg back.\n4. Continue alternating knees quickly, like running in place.\n5. Keep your core tight and back flat throughout.`,
          gif: 'MClimbers.gif',
        },
      ],
    },
    {
      id: '5',
      name: 'Lower Body Power & Stability',
      description: 'Focus on building leg strength and stability with targeted lower body exercises and core stabilization.',
      shortDescription: 'Build powerful legs and improve balance with this lower-body focused routine.',
      difficulty: 'intermediate',
      duration: 35,
      equipment: ['bodyweight', 'dumbbells'],
      gif: 'workout5.jpg',
      exercises: [
        {
          id: 'w5e1',
          name: 'Bulgarian Split Squat',
          description: `1. Place your right foot on a bench or box that's about knee height, bending your knee slightly, and step your left foot about 18 inches away. Your left leg should be almost straight.\n2. Hold medium-weight dumbbells at your shoulders. Bend your left knee, sitting back; your right knee will bend more as you do this and nearly touch the floor.\n3. Hold when your left thigh is parallel to the floor, then stand back up. That's 1 rep; do 12 per side.`,
          gif: 'BulgSquat.gif',
          sets: 2,
          reps: 10,
        },
        {
          id: 'w5e2',
          name: 'Reverse Lunge',
          description: `1. Stand tall with your feet hip-width apart.\n2. Step your right foot backward and lower your body until both knees form 90-degree angles.\n3. Push through your left heel to return to standing.\n4. Step your left foot back and repeat the lunge.\n5. Alternate legs each rep, keeping your torso upright.`,
          gif: 'RLunge.gif',
          sets: 2,
          reps: 12,
        },
        {
          id: 'w5e3',
          name: 'Sumo Squat and Calf Raise',
          description: `1. Stand wide, toes out, heels in.\n2. Squat down, knees over toes.\n3. At the bottom, lift your heels into a calf raise.\n4. Try to stand while heels stay lifted, then lower.`,
          gif: 'sumo-squat-calf-raisse.gif',
          sets: 3,
          reps: 15,
        },
        {
          id: 'w5e4',
          name: 'Dumbbell Romanian Deadlift',
          description: `1. Stand holding medium-weight dumbbells at your sides, feet hip-width apart, core braced, knees slightly bent.\n2. Hinge at your hips and push your butt backward, lowering your torso.\n3. Hinge until you feel a slight stretch in your hamstrings.\n4. Pause, then stand up, squeezing your glutes. That's 1 rep; do 12.`,
          gif: '/exercise/RDeadlift.gif',
          sets: 3,
          reps: 12,
        },
        {
          id: 'w5e5',
          name: 'Glute Bridges',
          description: `1. Lie on your back with knees bent and feet flat on the floor.\n2. Extend one leg straight up toward the ceiling, keeping the other foot grounded.\n3. Engage your core and squeeze your glutes to lift your hips off the ground.\n4. At the top, your shoulders, hips, and grounded knee should form a straight line.\n5. Lower your hips back to the floor slowly, keeping the raised leg stable.\n6. Repeat on one side, then switch legs.`,
          gif: 'GluteB.gif',
          sets: 2,
          reps: 15,
        },
      ],
    },
    {
      id: '6',
      name: 'Core Strength & Stability',
      description: 'Build a strong foundation with this core-focused workout that targets all the muscles of your midsection.',
      shortDescription: 'Strengthen your core from all angles with planks, twists, and stabilization exercises.',
      difficulty: 'beginner',
      duration: 25,
      equipment: ['bodyweight'],
      gif: 'workout6.jpeg',
      exercises: [
        {
          id: 'w6e1',
          name: 'High Plank',
          description: `1. Begin on all fours, then step your feet back to extend your legs fully.\n2. Place your hands directly under your shoulders, arms straight.\n3. Engage your core, glutes, and quads.\n4. Keep your body in a straight line from head to heels — no sagging or arching.\n5. Hold this position for the desired time, maintaining steady breathing.`,
          gif: 'PlankT.gif',
          sets: 3,
          duration: 30,
        },
        {
          id: 'w6e2',
          name: 'Russian Twist',
          description: `1. Sit on the floor with your knees bent and feet hovering above the ground.\n2. Lean back slightly to engage your core, keeping your spine long.\n3. Clasp your hands or hold a weight at your chest.\n4. Twist your torso to the right, bringing your hands beside your hip.\n5. Rotate to the left in the same manner.\n6. Continue alternating sides in a controlled manner.`,
          gif: 'RTwist.gif',
          sets: 3,
          reps: 20,
        },
        {
          id: 'w6e3',
          name: 'Hollow Body Hold',
          description: `1. Start lying on your back, arms and legs extended.\n2. Tighten your abs, pressing your lower back into the floor as you do so. This should lift your legs off the floor; work to keep them straight.\n3. Lift your shoulder blades off the floor as well; keep extending your arms back as you do this.\n4. Hold for 30 seconds. That's 1 rep; do 3 to 5.`,
          gif: 'BodyHold.gif',
          sets: 3,
          duration: 30,
        },
        {
          id: 'w6e4',
          name: 'Mountain Climbers',
          description: `1. Begin in a high plank position with shoulders over wrists.\n2. Drive your right knee toward your chest.\n3. Quickly switch and drive your left knee in while extending the right leg back.\n4. Continue alternating knees quickly, like running in place.\n5. Keep your core tight and back flat throughout.`,
          gif: 'MClimbers.gif',
          sets: 3,
          duration: 45,
        },
        {
          id: 'w6e5',
          name: 'Side Plank and Reach',
          description: `1. Start in a right forearm side plank.\n2. Reach left arm under your body.\n3. Return to start with left arm overhead. That's one rep. Modification: Drop your right knee or left toes to the ground.`,
          gif: 'side-plank-and-reach-open.gif',
          sets: 2,
          reps: 10,
        },
      ],
    },
    {
      id: '7',
      name: 'Upper Body Power',
      description: 'Build strength and definition in your arms, chest, shoulders and back with this targeted upper body routine.',
      shortDescription: 'Focused on developing upper body strength through pushing and pulling movements.',
      difficulty: 'intermediate',
      duration: 40,
      equipment: ['dumbbells'],
      gif: 'workout7.jpeg',
      exercises: [
        {
          id: 'w7e1',
          name: 'Push-Up',
          description: `1. Start in a high plank position with hands under shoulders, body in a straight line.\n2. Lower your body toward the floor by bending your elbows at a 45-degree angle.\n3. Keep your core engaged and avoid letting your hips sag.\n4. Push through your palms to return to the starting position.\n5. Repeat for reps or time.`,
          gif: 'Push.gif',
          sets: 3,
          reps: 12,
        },
        {
          id: 'w7e2',
          name: 'Alternating Dumbbell Row',
          description: `1. Stand holding medium-weight dumbbells. Hinge at your hips until your torso is almost parallel to the floor.\n2. Squeeze your shoulder blades and row the right dumbbell to your chest.\n3. Lower it and repeat with the left dumbbell. That's 1 rep; do 12.`,
          gif: '/exercise/AltDumbbell.gif',
          sets: 3,
          reps: 12,
        },
        {
          id: 'w7e3',
          name: 'Glute Bridge Floor Press',
          description: `1. Lie on the floor holding medium-weight dumbbells, upper arms on the floor, elbows bent 90 degrees.\n2. Tighten your glutes and push your hips upward.\n3. Press the dumbbells upward.\n4. Pause, then lower them back to the start. That's 1 rep; do 12.`,
          gif: '/exercise/GlutePress.gif',
          sets: 3,
          reps: 12,
        },
        {
          id: 'w7e4',
          name: 'Side-Plank Press',
          description: `1. Start in a left-side plank, your left elbow on the floor and your torso and hips tight, a light dumbbell in front of you.\n2. Grasp the dumbbell with your right hand. Continue pressing your hips upward as you lift the dumbbell off the floor and pull it close to your right pec.\n3. Press it toward the ceiling, then return it to the floor. That's 1 rep; do 12 per side.`,
          gif: '/exercise/SidePress.gif',
          sets: 2,
          reps: 10,
        },
        {
          id: 'w7e5',
          name: 'Push-Up to Forearm Plank',
          description: `1. Begin in a full push-up position with arms extended, hands under shoulders.\n2. Lower down into a push-up, keeping elbows close to your body.\n3. Push back up, then lower your right forearm to the mat, followed by your left, into a forearm plank.\n4. Reverse the movement by placing your right hand on the floor, then your left, returning to high plank.\n5. Repeat the sequence, alternating the leading arm each time.`,
          gif: 'PushPlank.gif',
          sets: 2,
          reps: 8,
        },
      ],
    },
    {
      id: '8',
      name: 'Functional Fitness Circuit',
      description: 'Improve everyday movement patterns and build practical strength with this functional training workout.',
      shortDescription: 'Combines compound movements that translate to better performance in daily activities.',
      difficulty: 'intermediate',
      duration: 45,
      equipment: ['bodyweight', 'dumbbells'],
      gif: 'workout8.jpg',
      exercises: [
        {
          id: 'w8e1',
          name: 'Two Back Rows, Clean and Two Uneven Front Squat Thrusters',
          description: `1. Stand with feet shoulder-width apart, knees slightly bent. Hold a dumbbell in your right hand, palm facing in, hanging between your thighs.\n2. Pull your right elbow back to your hip for a row, squeezing your back. Lower with control. Repeat for two rows.\n3. Press through your heels to stand tall and clean the dumbbell to your right shoulder.\n4. Lower into a squat, hips back and knees bent to 90 degrees.\n5. Stand up and press the dumbbell overhead. Repeat for two squat thrusters. Modification: Skip the overhead press and hold the dumbbell at your side during squats.`,
          gif: 'row-squat-press-functional-training-workout.gif',
          sets: 3,
          reps: 8,
        },
        {
          id: 'w8e2',
          name: 'T-Spine Rotation to Downward Dog',
          description: `1. Start in pushup position.\n2. Keeping your left leg straight, place your right foot just outside your right hand. Hold.\n3. Lift your right arm and reach for the ceiling. Hold, then return to pushup position.\n4. Shift your feet forward slightly, then raise your hips high. Try to form a straight line from your hands through your hips while also trying to keep your legs straight.\n5. Hold, then return to the start. That's 1 rep.`,
          gif: '/exercise/DownwardDog.gif',
          sets: 2,
          reps: 8,
        },
        {
          id: 'w8e3',
          name: 'Toe-Touch Squat',
          description: `1. Start standing, feet about shoulder-width apart, arms held in front of you.\n2. Keeping your back flat, bend your knees slightly and hinge forward at your hips until your hands touch your toes.\n3. When they do, bend at the knees so you finish in a low squat position.\n4. Reach your arms overhead.\n5. Stand back up. That's 1 rep.`,
          gif: '/exercise/TSquat.gif',
          sets: 3,
          reps: 12,
        },
        {
          id: 'w8e4',
          name: 'Runner Lunge',
          description: `1. Stand staggered: right foot front, left toes back.\n2. Step the left leg into a reverse lunge.\n3. Tap the left foot next to the right without standing up.\n4. Step back into a lunge, then stand tall.\n5. Repeat on one side, switch legs next set.`,
          gif: 'runner-lunges-bodyweight-workout.gif',
          sets: 2,
          reps: 12,
        },
        {
          id: 'w8e5',
          name: 'Shuffle and Two Squat Dumbbell High Pulls',
          description: `1. Place a dumbbell on the ground, feet apart in an athletic stance (knees bent, core tight).\n2. Shuffle right, stop in a squat stance with your right foot near the dumbbell.\n3. Pick up the dumbbell with your left hand, stand and pull it to shoulder height, elbow leading. Lower and repeat for two reps.\n4. Shuffle left and repeat the same steps with your right hand.`,
          gif: 'lateral-hop-dumbbell-pull-functional-training-workout.gif',
          sets: 2,
          reps: 8,
        },
      ],
    },
    {
      id: '9',
      name: 'Quick Total Body Burn',
      description: 'A fast-paced, efficient workout that targets your entire body in just 20 minutes.',
      shortDescription: 'Short but intense full-body routine perfect for busy days when time is limited.',
      difficulty: 'beginner',
      duration: 20,
      equipment: ['bodyweight'],
      gif: 'workout9.jpeg',
      exercises: [
        {
          id: 'w9e1',
          name: 'Mountain Climbers',
          description: `1. Begin in a high plank position with shoulders over wrists.\n2. Drive your right knee toward your chest.\n3. Quickly switch and drive your left knee in while extending the right leg back.\n4. Continue alternating knees quickly, like running in place.\n5. Keep your core tight and back flat throughout.`,
          gif: 'MClimbers.gif',
          sets: 3,
          duration: 30,
        },
        {
          id: 'w9e2',
          name: 'Push-Up',
          description: `1. Start in a high plank position with hands under shoulders, body in a straight line.\n2. Lower your body toward the floor by bending your elbows at a 45-degree angle.\n3. Keep your core engaged and avoid letting your hips sag.\n4. Push through your palms to return to the starting position.\n5. Repeat for reps or time.`,
          gif: 'Push.gif',
          sets: 3,
          reps: 10,
        },
        {
          id: 'w9e3',
          name: 'Squat and Knee to Elbow Crunch',
          description: `1. Stand with feet shoulder-width apart, hands by your head.\n2. Squat down to 90 degrees.\n3. As you rise, bring your right knee to your left elbow.\n4. Lower the leg and repeat. Alternate sides.`,
          gif: 'squat-and-knee-to-elbow-crunch.gif',
          sets: 3,
          reps: 12,
        },
        {
          id: 'w9e4',
          name: 'Reverse Lunge',
          description: `1. Stand tall with your feet hip-width apart.\n2. Step your right foot backward and lower your body until both knees form 90-degree angles.\n3. Push through your left heel to return to standing.\n4. Step your left foot back and repeat the lunge.\n5. Alternate legs each rep, keeping your torso upright.`,
          gif: 'RLunge.gif',
          sets: 3,
          reps: 12,
        },
        {
          id: 'w9e5',
          name: 'Russian Twist',
          description: `1. Sit on the floor with your knees bent and feet hovering above the ground.\n2. Lean back slightly to engage your core, keeping your spine long.\n3. Clasp your hands or hold a weight at your chest.\n4. Twist your torso to the right, bringing your hands beside your hip.\n5. Rotate to the left in the same manner.\n6. Continue alternating sides in a controlled manner.`,
          gif: 'RTwist.gif',
          sets: 3,
          reps: 16,
        },
      ],
    },
    {
      id: '10',
      name: 'HIIT Power Circuit',
      description: 'High-intensity interval training that alternates between intense bursts of activity and fixed periods of less-intense activity or rest.',
      shortDescription: 'Maximize calorie burn and improve cardiovascular fitness with this high-intensity workout.',
      difficulty: 'advanced',
      duration: 30,
      equipment: ['bodyweight', 'dumbbells'],
      gif: 'workout10.jpeg',
      exercises: [
        {
          id: 'w10e1',
          name: 'Mountain Climbers',
          description: `1. Begin in a high plank position with shoulders over wrists.\n2. Drive your right knee toward your chest.\n3. Quickly switch and drive your left knee in while extending the right leg back.\n4. Continue alternating knees quickly, like running in place.\n5. Keep your core tight and back flat throughout.`,
          gif: 'MClimbers.gif',
          sets: 4,
          duration: 40,
        },
        {
          id: 'w10e2',
          name: 'Push-Up',
          description: `1. Start in a high plank position with hands under shoulders, body in a straight line.\n2. Lower your body toward the floor by bending your elbows at a 45-degree angle.\n3. Keep your core engaged and avoid letting your hips sag.\n4. Push through your palms to return to the starting position.\n5. Repeat for reps or time.`,
          gif: 'Push.gif',
          sets: 4,
          reps: 15,
        },
        {
          id: 'w10e3',
          name: 'Alternating Dumbbell Row',
          description: `1. Stand holding medium-weight dumbbells. Hinge at your hips until your torso is almost parallel to the floor.\n2. Squeeze your shoulder blades and row the right dumbbell to your chest.\n3. Lower it and repeat with the left dumbbell. That's 1 rep; do 12.`,
          gif: '/exercise/AltDumbbell.gif',
          sets: 4,
          reps: 15,
        },
        {
          id: 'w10e4',
          name: 'Sumo Squat and Calf Raise',
          description: `1. Stand wide, toes out, heels in.\n2. Squat down, knees over toes.\n3. At the bottom, lift your heels into a calf raise.\n4. Try to stand while heels stay lifted, then lower.`,
          gif: 'sumo-squat-calf-raisse.gif',
          sets: 4,
          reps: 15,
        },
        {
          id: 'w10e5',
          name: 'Russian Twist',
          description: `1. Sit on the floor with your knees bent and feet hovering above the ground.\n2. Lean back slightly to engage your core, keeping your spine long.\n3. Clasp your hands or hold a weight at your chest.\n4. Twist your torso to the right, bringing your hands beside your hip.\n5. Rotate to the left in the same manner.\n6. Continue alternating sides in a controlled manner.`,
          gif: 'RTwist.gif',
          sets: 4,
          reps: 20,
        },
      ],
    },
    {
      id: '11',
      name: 'Mobility & Recovery',
      description: 'A gentle workout focused on improving joint mobility, flexibility, and promoting recovery between more intense training sessions.',
      shortDescription: 'Enhance flexibility and joint mobility while aiding muscle recovery and reducing stiffness.',
      difficulty: 'beginner',
      duration: 30,
      equipment: ['bodyweight'],
      gif: 'workout11.jpg',
      exercises: [
        {
          id: 'w11e1',
          name: 'T-Spine Rotation to Downward Dog',
          description: `1. Start in pushup position.\n2. Keeping your left leg straight, place your right foot just outside your right hand. Hold.\n3. Lift your right arm and reach for the ceiling. Hold, then return to pushup position.\n4. Shift your feet forward slightly, then raise your hips high. Try to form a straight line from your hands through your hips while also trying to keep your legs straight.\n5. Hold, then return to the start. That's 1 rep.`,
          gif: '/exercise/DownwardDog.gif',
          sets: 2,
          reps: 6,
        },
        {
          id: 'w11e2',
          name: 'Side Plank and Reach',
          description: `1. Start in a right forearm side plank.\n2. Reach left arm under your body.\n3. Return to start with left arm overhead. That's one rep. Modification: Drop your right knee or left toes to the ground.`,
          gif: 'side-plank-and-reach-open.gif',
          sets: 2,
          reps: 8,
        },
        {
          id: 'w11e3',
          name: 'Runner Lunge',
          description: `1. Stand staggered: right foot front, left toes back.\n2. Step the left leg into a reverse lunge.\n3. Tap the left foot next to the right without standing up.\n4. Step back into a lunge, then stand tall.\n5. Repeat on one side, switch legs next set.`,
          gif: 'runner-lunges-bodyweight-workout.gif',
          sets: 2,
          reps: 10,
        },
        {
          id: 'w11e4',
          name: 'Glute Bridges',
          description: `1. Lie on your back with knees bent and feet flat on the floor.\n2. Extend one leg straight up toward the ceiling, keeping the other foot grounded.\n3. Engage your core and squeeze your glutes to lift your hips off the ground.\n4. At the top, your shoulders, hips, and grounded knee should form a straight line.\n5. Lower your hips back to the floor slowly, keeping the raised leg stable.\n6. Repeat on one side, then switch legs.`,
          gif: 'GluteB.gif',
          sets: 2,
          reps: 12,
        },
        {
          id: 'w11e5',
          name: 'Toe-Touch Squat',
          description: `1. Start standing, feet about shoulder-width apart, arms held in front of you.\n2. Keeping your back flat, bend your knees slightly and hinge forward at your hips until your hands touch your toes.\n3. When they do, bend at the knees so you finish in a low squat position.\n4. Reach your arms overhead.\n5. Stand back up. That's 1 rep.`,
          gif: '/exercise/TSquat.gif',
          sets: 2,
          reps: 10,
        },
      ],
    },
    {
      id: '12',
      name: 'Strength & Power Combo',
      description: 'A challenging workout that combines strength training with power movements to build muscle and explosive power.',
      shortDescription: 'Build muscle and develop explosive power with this combination of strength and power exercises.',
      difficulty: 'advanced',
      duration: 50,
      equipment: ['dumbbells'],
      gif: 'workout12.jpeg',
      exercises: [
        {
          id: 'w12e1',
          name: 'Two Snatches and Two Push Ups',
          description: `1. Stand with feet shoulder-width apart, knees slightly bent. Place a dumbbell between your feet.\n2. Hinge at the hips and grab the dumbbell with your right hand.\n3. Drive through your legs to lift and press the dumbbell overhead in one motion. Lock out your arm. Lower with control. Repeat on the left. Do two snatches total.\n4. Place both hands on the floor and step or jump back into a high plank (arms straight, shoulders over wrists, body in a line).\n5. Bend your elbows to lower your chest, then push back up. Do two push ups. Modification: Step to plank and do knee or incline push ups.`,
          gif: 'snatches-and-push-ups-functional-training-workout.gif',
          sets: 4,
          reps: 6,
        },
        {
          id: 'w12e2',
          name: 'Dumbbell Romanian Deadlift',
          description: `1. Stand holding medium-weight dumbbells at your sides, feet hip-width apart, core braced, knees slightly bent.\n2. Hinge at your hips and push your butt backward, lowering your torso.\n3. Hinge until you feel a slight stretch in your hamstrings.\n4. Pause, then stand up, squeezing your glutes. That's 1 rep; do 12.`,
          gif: '/exercise/RDeadlift.gif',
          sets: 4,
          reps: 10,
        },
        {
          id: 'w12e3',
          name: 'Bulgarian Split Squat',
          description: `1. Place your right foot on a bench or box that's about knee height, bending your knee slightly, and step your left foot about 18 inches away. Your left leg should be almost straight.\n2. Hold medium-weight dumbbells at your shoulders. Bend your left knee, sitting back; your right knee will bend more as you do this and nearly touch the floor.\n3. Hold when your left thigh is parallel to the floor, then stand back up. That's 1 rep; do 12 per side.`,
          gif: 'BulgSquat.gif',
          sets: 3,
          reps: 8,
        },
        {
          id: 'w12e4',
          name: 'Glute Bridge Floor Press',
          description: `1. Lie on the floor holding medium-weight dumbbells, upper arms on the floor, elbows bent 90 degrees.\n2. Tighten your glutes and push your hips upward.\n3. Press the dumbbells upward.\n4. Pause, then lower them back to the start. That's 1 rep; do 12.`,
          gif: '/exercise/GlutePress.gif',
          sets: 3,
          reps: 12,
        },
        {
          id: 'w12e5',
          name: 'Side-Plank Press',
          description: `1. Start in a left-side plank, your left elbow on the floor and your torso and hips tight, a light dumbbell in front of you.\n2. Grasp the dumbbell with your right hand. Continue pressing your hips upward as you lift the dumbbell off the floor and pull it close to your right pec.\n3. Press it toward the ceiling, then return it to the floor. That's 1 rep; do 12 per side.`,
          gif: '/exercise/SidePress.gif',
          sets: 3,
          reps: 10,
        },
      ],
    },
    {
      id: '13',
      name: 'Cardio Endurance Builder',
      description: 'Improve your cardiovascular endurance and stamina with this high-rep, low-rest workout routine.',
      shortDescription: 'Boost your cardio fitness and endurance with continuous movement and minimal rest periods.',
      difficulty: 'intermediate',
      duration: 35,
      equipment: ['bodyweight'],
      gif: 'workout13.jpeg',
      exercises: [
        {
          id: 'w13e1',
          name: 'Mountain Climbers',
          description: `1. Begin in a high plank position with shoulders over wrists.\n2. Drive your right knee toward your chest.\n3. Quickly switch and drive your left knee in while extending the right leg back.\n4. Continue alternating knees quickly, like running in place.\n5. Keep your core tight and back flat throughout.`,
          gif: 'MClimbers.gif',
          sets: 3,
          duration: 45,
        },
        {
          id: 'w13e2',
          name: 'Squat and Knee to Elbow Crunch',
          description: `1. Stand with feet shoulder-width apart, hands by your head.\n2. Squat down to 90 degrees.\n3. As you rise, bring your right knee to your left elbow.\n4. Lower the leg and repeat. Alternate sides.`,
          gif: 'squat-and-knee-to-elbow-crunch.gif',
          sets: 3,
          reps: 20,
        },
        {
          id: 'w13e3',
          name: 'Push-Up',
          description: `1. Start in a high plank position with hands under shoulders, body in a straight line.\n2. Lower your body toward the floor by bending your elbows at a 45-degree angle.\n3. Keep your core engaged and avoid letting your hips sag.\n4. Push through your palms to return to the starting position.\n5. Repeat for reps or time.`,
          gif: 'Push.gif',
          sets: 3,
          reps: 15,
        },
        {
          id: 'w13e4',
          name: 'Reverse Lunge',
          description: `1. Stand tall with your feet hip-width apart.\n2. Step your right foot backward and lower your body until both knees form 90-degree angles.\n3. Push through your left heel to return to standing.\n4. Step your left foot back and repeat the lunge.\n5. Alternate legs each rep, keeping your torso upright.`,
          gif: 'RLunge.gif',
          sets: 3,
          reps: 20,
        },
        {
          id: 'w13e5',
          name: 'Push-Up to Forearm Plank',
          description: `1. Begin in a full push-up position with arms extended, hands under shoulders.\n2. Lower down into a push-up, keeping elbows close to your body.\n3. Push back up, then lower your right forearm to the mat, followed by your left, into a forearm plank.\n4. Reverse the movement by placing your right hand on the floor, then your left, returning to high plank.\n5. Repeat the sequence, alternating the leading arm each time.`,
          gif: 'PushPlank.gif',
          sets: 3,
          reps: 12,
        },
      ],
    },
    {
      id: '14',
      name: 'Balance & Coordination',
      description: 'Improve your balance, coordination, and body control with this specialized workout routine.',
      shortDescription: 'Enhance proprioception and stability with exercises that challenge your balance and coordination.',
      difficulty: 'intermediate',
      duration: 35,
      equipment: ['bodyweight', 'dumbbells'],
      gif: 'workout14.jpeg',
      exercises: [
        {
          id: 'w14e1',
          name: 'Two Staggered Deadlifts and Two Balance Bicep Curls',
          description: `1. Stand with feet hip-width apart. Hold a dumbbell in your right hand, palm facing in.\n2. Step your right foot slightly behind your left, resting on your right toes. Keep 80% of your weight in the front foot.\n3. Hinge at the hips, sliding the dumbbell down your front leg. Keep your back flat and core engaged. Repeat for two deadlifts.\n4. Shift your weight onto your left foot, lifting your right knee until your thigh is parallel to the floor.\n5. Perform two bicep curls while balancing, curling the dumbbell to shoulder height. Modification: Keep both feet on the ground in the staggered stance for curls.`,
          gif: 'staggered-deadlift-and-balance-curl-balance-curl.gif',
          sets: 3,
          reps: 8,
        },
        {
          id: 'w14e2',
          name: 'Side Plank and Reach',
          description: `1. Start in a right forearm side plank.\n2. Reach left arm under your body.\n3. Return to start with left arm overhead. That's one rep. Modification: Drop your right knee or left toes to the ground.`,
          gif: 'side-plank-and-reach-open.gif',
          sets: 3,
          reps: 10,
        },
        {
          id: 'w14e3',
          name: 'Runner Lunge',
          description: `1. Stand staggered: right foot front, left toes back.\n2. Step the left leg into a reverse lunge.\n3. Tap the left foot next to the right without standing up.\n4. Step back into a lunge, then stand tall.\n5. Repeat on one side, switch legs next set.`,
          gif: 'runner-lunges-bodyweight-workout.gif',
          sets: 3,
          reps: 12,
        },
        {
          id: 'w14e4',
          name: 'Shuffle and Two Squat Dumbbell High Pulls',
          description: `1. Place a dumbbell on the ground, feet apart in an athletic stance (knees bent, core tight).\n2. Shuffle right, stop in a squat stance with your right foot near the dumbbell.\n3. Pick up the dumbbell with your left hand, stand and pull it to shoulder height, elbow leading. Lower and repeat for two reps.\n4. Shuffle left and repeat the same steps with your right hand.`,
          gif: 'lateral-hop-dumbbell-pull-functional-training-workout.gif',
          sets: 3,
          reps: 8,
        },
        {
          id: 'w14e5',
          name: 'Bulgarian Split Squat',
          description: `1. Place your right foot on a bench or box that's about knee height, bending your knee slightly, and step your left foot about 18 inches away. Your left leg should be almost straight.\n2. Hold medium-weight dumbbells at your shoulders. Bend your left knee, sitting back; your right knee will bend more as you do this and nearly touch the floor.\n3. Hold when your left thigh is parallel to the floor, then stand back up. That's 1 rep; do 12 per side.`,
          gif: 'BulgSquat.gif',
          sets: 3,
          reps: 8,
        },
      ],
    },
  ],

  selectedWorkout: null,
  loading: false,
  error: null,
};

const workoutsSlice = createSlice({
  name: "workouts",
  initialState,
  reducers: {
    setSelectedWorkout: (state, action: PayloadAction<string | number>) => {
      state.selectedWorkout = state.workouts.find((w) => String(w.id) === String(action.payload)) || null;
    },
    clearSelectedWorkout: (state) => {
      state.selectedWorkout = null;
    },
    // Add reducer to handle local state update if backend save fails (optional)
  },
  extraReducers: (builder) => {
    builder
      // Fetch Workouts Cases
      .addCase(fetchWorkouts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkouts.fulfilled, (state, action: PayloadAction<Workout[]>) => {
        state.loading = false;
        state.workouts = action.payload;
        state.error = null;
      })
      .addCase(fetchWorkouts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to load workouts";
      })
      // Save Workout Cases
      .addCase(saveWorkout.pending, (state) => {
        state.loading = true; // Show loading during save
        state.error = null;
      })
      .addCase(saveWorkout.fulfilled, (state, action: PayloadAction<Workout>) => {
        state.loading = false;
        state.workouts.push(action.payload); // Add the newly saved workout (with ID) to the list
        state.error = null;
      })
      .addCase(saveWorkout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to save workout";
      });
  },
});

export const { setSelectedWorkout, clearSelectedWorkout } = workoutsSlice.actions;
export default workoutsSlice.reducer;