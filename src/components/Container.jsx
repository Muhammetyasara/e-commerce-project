export default function Container() {
  return (
    <section className="bg-white flex flex-col gap-6 text-black">
      <div className="w-full h-full flex items-start pt-24 lg:pt-0">
        <div className="flex flex-col items-center text-center gap-6 lg:flex-row-reverse lg:items">
          <div className="flex flex-col gap-6 items-center justify-center lg:items-start">
            <span className="text-sm tracking-widest font-semibold text-stone-400">
              SUMMER 2020
            </span>

            <h2 className="text-3xl font-bold w-1/2 lg:text-start">
              Part of the Neural Universe
            </h2>

            <p className="text-md w-2/3 font-medium text-stone-600 lg:text-start">
              We know how large objects will act, but things on a small scale.
            </p>
            <div className="flex flex-col gap-6 lg:flex-row">
              <button className="px-3 py-1 bg-blue-500 text-white rounded-md lg:bg-green-500">
                <p className="px-6 py-3 text-xs font-bold">BUY NOW</p>
              </button>
              <button className="border border-blue-500 px-3 py-1 bg-white text-blue-500 rounded-md lg:text-green-500 lg:border-green-500">
                <p className="px-4 py-3 text-xs font-bold">READ MORE</p>
              </button>
            </div>
          </div>
          <img
            src="./src/assets/images/container.png"
            alt=""
            className="lg:h-[774px]"
          />
        </div>
      </div>
    </section>
  );
}
