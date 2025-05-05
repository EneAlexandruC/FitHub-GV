import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/types/workout";

interface WorkoutCardProps {
  workout: Workout;
}

export const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  return (
    <Link href={`/workouts/${workout.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
        <div className="relative w-full h-48 rounded-t-lg overflow-hidden">
          <Image
            src={workout.imageUrl}
            alt={workout.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{workout.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{workout.description}</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm font-medium text-blue-600">
              {workout.difficulty}
            </span>
            <span className="text-sm text-gray-500">
              {workout.duration} min
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}; 