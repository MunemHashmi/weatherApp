import { SunIcon } from "@heroicons/react/solid";

function Loading() {
  return (
    <div className="bg-gradient-to-br from-[#394F68] to-[#183B7E] min-h-screen flex flex-col itmes-center
    justify-center text-slate-500">
      <div className="flex items-center justify-center">
      <SunIcon 
        className="h-24 w-24 animate-bounce text-yellow-500"
        color="yellow"
      />
      </div>
      <h1 className="text-6xl font-bold text-center mb-10 animate-pulse">
        Loading City Weather Information
      </h1>
    </div>
  )
}

export default Loading;