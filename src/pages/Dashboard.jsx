export default function Dashboard() {
  return (
    <div className="w-screen h-screen bg-black text-cyan-400 p-6">

      <div className="grid grid-cols-3 gap-6 h-full">

        <div className="border border-cyan-500 p-4">
          Clock
        </div>

        <div className="border border-cyan-500 p-4">
          AI Core
        </div>

        <div className="border border-cyan-500 p-4">
          Weather
        </div>

        <div className="border border-cyan-500 p-4">
          Tasks
        </div>

        <div className="border border-cyan-500 p-4">
          Voice Status
        </div>

        <div className="border border-cyan-500 p-4">
          Calendar
        </div>

        <div className="col-span-2 border border-cyan-500 p-4">
          News Feed
        </div>

        <div className="border border-cyan-500 p-4">
          System Stats
        </div>

      </div>

    </div>
  );
}