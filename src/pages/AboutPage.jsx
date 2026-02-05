import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Brands from "../components/Brands";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TeamMemberCard from "../components/TeamMemberCard";
import members from "../data/memberCards";

export default function AboutPage() {
  return (
    <section>
      <Header />

      <section className="py-24 lg:pl-52 lg:pr-16 lg:py-0">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:h-[75vh]">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-8 px-12 lg:px-0 pb-8 lg:pb-0 lg:w-[50vw]">
            <h1 className="font-bold hidden lg:block">ABOUT COMPANY</h1>
            <h1 className="font-bold text-4xl w-3/4 text-nowrap">ABOUT US</h1>
            <p className="text-stone-600 font-medium text-sm w-3/4">
              We know how large objects will act, but things on a small scale
              just do not act that way.
            </p>
            <button className="text-white text-sm font-semibold bg-sky-500 px-4 py-3 rounded">
              Get Quote Now
            </button>
          </div>
          <div className="relative w-full lg:w-2/3 h-[360px] lg:h-[90vh] flex items-center justify-center overflow-hidden px-12 lg:px-0">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-64 lg:w-[500px] aspect-square bg-red-100 rounded-full z-0"></div>

              <div
                className="lg:hidden absolute w-8 h-8 bg-red-100 rounded-full z-0"
                style={{
                  top: "calc(50% - 140px)",
                  left: "calc(45% - 100px)",
                }}
              ></div>
              <div
                className="hidden lg:block absolute w-16 h-16 bg-red-100 rounded-full z-0"
                style={{
                  top: "calc(40% - 140px)",
                  left: "calc(40% - 200px)",
                }}
              ></div>

              <div
                className="lg:hidden absolute w-4 h-4 bg-pink-200 rounded-full z-0"
                style={{
                  top: "calc(52% + 90px)",
                  left: "calc(50% + 90px)",
                }}
              ></div>
              <div
                className="hidden lg:block absolute w-8 h-8 bg-pink-200 rounded-full z-0"
                style={{
                  top: "calc(50% + 90px)",
                  left: "calc(60% + 180px)",
                }}
              ></div>

              <div
                className="lg:hidden absolute w-3 h-3 bg-purple-500 rounded-full z-0"
                style={{
                  top: "calc(35% - 50px)",
                  left: "calc(50% + 110px)",
                }}
              ></div>
              <div
                className="hidden lg:block absolute w-6 h-6 bg-purple-500 rounded-full z-0"
                style={{
                  top: "calc(35% - 50px)",
                  left: "calc(50% + 220px)",
                }}
              ></div>

              <div
                className="lg:hidden absolute w-3 h-3 bg-purple-500 rounded-full z-0"
                style={{
                  top: "calc(50% + 90px)",
                  left: "calc(50% - 110px)",
                }}
              ></div>
              <div
                className="hidden lg:block absolute w-6 h-6 bg-purple-500 rounded-full z-0"
                style={{
                  top: "calc(53% + 90px)",
                  left: "calc(46% - 220px)",
                }}
              ></div>
            </div>

            <img
              src="./src/assets/images/about-1.png"
              alt="product"
              className="relative z-10 h-[95%] max-w-none object-contain"
            />
          </div>
        </div>
      </section>

      <main className="px-12 py-24 lg:px-0">
        <div className="flex flex-col items-center justify-center text-center gap-32">
          <div className="flex flex-col gap-12 lg:flex-row lg:text-start lg:px-52 lg:gap-24">
            <div className="flex flex-col gap-4">
              <h2 className="text-red-500 font-medium text-xs">
                Problems trying
              </h2>
              <p className="font-bold">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met
                sent.
              </p>
            </div>
            <p className="text-start text-xs text-stone-600 lg:self-center lg:w-1/2">
              Problems trying to resolve the conflict between the two major
              realms of Classical physics: Newtonian mechanics
            </p>
          </div>
          <div className="flex flex-col gap-16 lg:flex-row lg:gap-32">
            <div className="flex flex-col gap-2">
              <p className="font-bold text-4xl lg:text-6xl">15K</p>
              <p className="text-xs text-stone-600 font-semibold lg:text-lg">
                Happy Customers
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold text-4xl lg:text-6xl">150K</p>
              <p className="text-xs text-stone-600 font-semibold lg:text-lg">
                Monthly Visitors
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold text-4xl lg:text-6xl">15</p>
              <p className="text-xs text-stone-600 font-semibold lg:text-lg">
                Countries Worldwide
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold text-4xl lg:text-6xl">100+</p>
              <p className="text-xs text-stone-600 font-semibold lg:text-lg">
                Top Partners
              </p>
            </div>
          </div>
          <div className="relative lg:px-52">
            <img
              src="./src/assets/images/about-2.png"
              className="h-[30vh] rounded-xl object-cover w-full lg:h-[65vh] lg:w-[65vw]"
            />

            <FontAwesomeIcon
              icon={faPlay}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-mg border rounded-full bg-sky-500 border-sky-500 p-4"
            />
          </div>
        </div>
      </main>

      <section className="pb-32 lg:px-52">
        <div className="flex flex-col justify-center items-center text-center gap-2">
          <h1 className="font-bold text-3xl">Meet Our Team</h1>
          <p className="text-sm w-3/4 text-stone-500 font-medium lg:w-1/3">
            Problems trying to resolve the conflict between the two major realms
            of Classical physics: Newtonian mechanics{" "}
          </p>
        </div>
        <div className="lg:flex lg:pt-16">
          {members
            .filter((member) => member.id < 4)
            .map((member) => (
              <TeamMemberCard
                key={member.id}
                title={member.title}
                image={member.image}
              />
            ))}
        </div>
      </section>

      <div className="flex flex-col justify-center items-center text-center gap-6 px-8">
        <h1 className="font-bold text-3xl">Big Companies Are Here</h1>
        <p className="text-sm text-stone-500 font-medium">
          Problems trying to resolve the conflict between the two major realms
          of Classical physics: Newtonian mechanics
        </p>
      </div>

      <Brands />

      <section className="lg:flex">
        <div className="flex flex-col flex-1 gap-6 bg-sky-600 py-20 px-12 text-white text-center lg:px-0 lg:justify-center lg:text-start lg:pl-44">
          <h2 className="font-bold ">WORK WITH US</h2>
          <p className="font-bold text-4xl">Now Let’s grow Yours</p>
          <p className="text-stone-200 font-semibold text-xs lg:w-1/2">
            The gradual accumulation of information about atomic and small-scale
            behavior during the first quarter of the 20th
          </p>
          <button className="border p-3 text-center w-[40vw] self-center font-bold rounded-md lg:self-start lg:w-1/6">
            Button
          </button>
        </div>
        <div className="hidden lg:flex w-[35vw]">
            <img src="./src/assets/images/about-3.png" alt="" className="object-cover w-full h-full"/>
        </div>
      </section>
      <Footer />
    </section>
  );
}
