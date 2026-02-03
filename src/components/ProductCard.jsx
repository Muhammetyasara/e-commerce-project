export default function ProductCard({title, image}) {
  return (
    <section className="m-10 flex flex-col items-center gap-4 lg:m-0 lg:w-1/5 lg:flex">
      <img src={image} alt={title} className="lg:w-[239px] lg:h-[427px] lg:object-cover" />
      <p className="font-bold">Graphic Design</p>
      <p className="text-stone-700 font-semibold">English Department</p>
      <div className="flex gap-2">
        <span className="text-stone-400 font-medium">$16.48</span>
        <span className="text-green-700 font-semibold">$6.48</span>
      </div>

      <div className="flex gap-1 lg:pb-8">
        <span className="w-4 h-4 rounded-full bg-blue-600"></span>
        <span className="w-4 h-4 rounded-full bg-green-600"></span>
        <span className="w-4 h-4 rounded-full bg-orange-600"></span>
        <span className="w-4 h-4 rounded-full bg-black"></span>
      </div>
    </section>
  );
}
