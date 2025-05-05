import Image from "next/image";

<div className="relative w-full h-[300px] rounded-lg overflow-hidden">
  <Image
    src={workout.imageUrl}
    alt={workout.name}
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, 1200px"
    priority
  />
</div> 