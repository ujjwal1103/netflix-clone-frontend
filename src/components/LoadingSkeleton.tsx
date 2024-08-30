const LoadingSkeleton = () => (
    <div className="p-4">
      <div className="w-48 rounded-xl animate-pulse mb-2 h-10 bg-zinc-950"></div>
      <div className="flex gap-2">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="w-48 rounded-xl animate-pulse h-72 bg-zinc-950"
          ></div>
        ))}
      </div>
    </div>
  );

export default LoadingSkeleton