import { Link } from "react-router-dom";
import { Clock, Dumbbell, BarChart } from "lucide-react";
import Image from "next/image";

interface WorkoutCardProps {
  workout: {
    id: string;
    name: string;
    imageUrl: string;
    duration: number;
    equipment: string[];
    difficulty: string;
  };
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link
      to={`/workout/${workout.id}`}
      className="group bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <div className="relative h-48">
        <Image
          src={workout.imageUrl}
          alt={workout.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-2xl font-bold mb-2">{workout.name}</h3>
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {workout.duration} min
            </span>
            <span className="flex items-center">
              <Dumbbell className="w-4 h-4 mr-1" />
              {workout.equipment.join(", ")}
            </span>
            <span className="flex items-center">
              <BarChart className="w-4 h-4 mr-1" />
              {workout.difficulty}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
