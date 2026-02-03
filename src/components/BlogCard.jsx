import { ChevronRight, AlarmClock, ChartArea} from "lucide-react";

export default function BlogCard({ title, image }) {
  return (
    <section className="m-10 flex flex-col items-center gap-4 shadow-md border lg:m-0 lg:w-[329px]">
      <img src={image} alt={title} className="w-full h-[300px]"/>
      <div className="absolute flex items-end justify-start mr-64 mt-4">
        <span className="inset-0 bg-red-500 w-16 h-58 py-1 flex justify-center text-white text-sm font-bold tracking-wide rounded">
          NEW
        </span>
      </div>
      <div className="flex flex-col items-start gap-5 px-6 py-6">
        <div className="flex gap-2">
          <span className="text-xs text-cyan-500">Google</span>
          <span className="text-xs text-stone-600">Trending</span>
          <span className="text-xs text-stone-600">New</span>
        </div>
        <h3 className="text-lg">Loudest â la Madison #1 (L'integral)</h3>
        <p className="text-stone-600 font-medium">
          We focus on ergonomics and meeting you where you work. It's only a
          keystroke away.
        </p>
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-1 text-xs">
            <AlarmClock size={15} className="text-cyan-500"/>
            <span className="text-stone-600">22 April 2021</span>
          </div>
            <div className="flex items-center gap-1 text-xs">
              <ChartArea size={15} className="text-green-500"/>
              <span className="text-stone-600">10 comments</span>
            </div>
          
        </div>
        <span className="flex items-center justify-center">
          <button className="font-semibold text-stone-600 text-sm">
            Learn More{" "}
          </button>
          <ChevronRight className="text-cyan-500" />
        </span>
      </div>
    </section>
  );
}
