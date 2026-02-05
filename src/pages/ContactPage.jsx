import Header from "../layout/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  faPhone,
  faLocationPin,
  faEnvelope,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../layout/Footer";
import { CornerDownRight, CornerRightDown } from "lucide-react";

export default function ContactPage() {
  return (
    <section className="bg-stone-100 h-screen">
      <Header />

      <main className="bg-white py-8 lg:pl-52">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6 px-12 lg:px-0 pb-8 lg:pb-0 lg:w-1/3">
            <h2 className="font-semibold">CONTACT US</h2>
            <h1 className="font-bold text-3xl lg:text-6xl">
              Get in touch <br /> today!
            </h1>
            <p className="font-medium text-stone-500">
              We know how large objects will act, but things on a small scale
              just do not act that way
            </p>
            <div className="flex flex-col gap-4">
              <p className="font-bold">Phone ; +451 215 215</p>
              <p className="font-bold">Fax ; +451 215 215</p>
            </div>
            <div className="flex gap-4 text-2xl">
              <FontAwesomeIcon icon={faTwitter} />
              <FontAwesomeIcon icon={faFacebook} />
              <FontAwesomeIcon icon={faInstagram} />
              <FontAwesomeIcon icon={faLinkedin} />
            </div>
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
              src="./src/assets/images/contact-1.png"
              alt="product"
              className="relative z-10 h-[95%] max-w-none object-contain"
            />
          </div>
        </div>
      </main>

      <section className="bg-stone-100 py-12 lg:bg-white">
        <div className="flex flex-col items-center text-center gap-3 py-8">
          <h3 className="font-bold text-xs">VISIT OUR OFFICE</h3>
          <h1 className="w-3/4 font-bold text-3xl">
            We help small businesses <br /> with big ideas
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-6 lg:flex-row">
          <div className="flex flex-col text-center items-center justify-center gap-6 h-[300px] text-xs w-[250px] bg-white">
            <FontAwesomeIcon icon={faPhone} className="text-sky-500 text-6xl" />
            <div className="flex flex-col text-center gap-1">
              <p className="font-semibold">georgia.young@example.com</p>
              <p className="font-semibold">georgia.young@example.com</p>
            </div>
            <h2 className="font-bold">Get Support</h2>
            <button className="text-sky-500 border border-sky-500 rounded p-2 font-bold">
              Submit Request
            </button>
          </div>
          <div className="bg-slate-900 text-white flex flex-col text-center items-center justify-center gap-6 h-[300px] text-xs w-[250px]">
            <FontAwesomeIcon
              icon={faLocationPin}
              className="text-sky-500 text-6xl"
            />
            <div className="flex flex-col text-center gap-1">
              <p className="font-semibold">georgia.young@example.com</p>
              <p className="font-semibold">georgia.young@example.com</p>
            </div>
            <h2 className="font-bold">Get Support</h2>
            <button className="text-sky-500 border border-sky-500 rounded p-2 font-bold">
              Submit Request
            </button>
          </div>
          <div className="flex flex-col text-center items-center justify-center gap-6 h-[300px] text-xs w-[250px] bg-white">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-sky-500 text-6xl"
            />
            <div className="flex flex-col text-center gap-1">
              <p className="font-semibold">georgia.young@example.com</p>
              <p className="font-semibold">georgia.young@example.com</p>
            </div>
            <h2 className="font-bold">Get Support</h2>
            <button className="text-sky-500 border border-sky-500 rounded p-2 font-bold">
              Submit Request
            </button>
          </div>
        </div>
      </section>
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <svg
          viewBox="0 0 200 200"
          className="w-24 h-24 text-sky-500"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="
      M60 40
      Q120 40 120 140
    "
            strokeWidth="6"
            strokeLinecap="round"
          />

          <path
            d="M100 120 L120 140 L140 120"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="flex flex-col gap-5">
          <h2 className="font-bold text-sm">We Can't WAIT TO MEET YOU</h2>
          <h1 className="text-5xl font-bold text-nowrap">Let's Talk</h1>
          <button className="text-white text-xs w-1/2 py-3 px-6 text-nowrap flex justify-center self-center font-semibold border rounded bg-sky-500">
            Try it free now
          </button>
        </div>
      </div>
      <Footer />
    </section>
  );
}
