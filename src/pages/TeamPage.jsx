import { ChevronRight } from "lucide-react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import TeamMemberCard from "../components/TeamMemberCard";
import members from "../data/memberCards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

export default function TeamPage() {
  return (
    <section>
      <Header />

      <section className="flex flex-col">
        <div className="flex flex-col items-center justify-center gap-5 py-12">
          <h2 className="font-semibold text-stone-500">WHAT WE DO</h2>
          <h1 className="text-wrap text-2xl font-bold w-3/5 text-center">
            Innovation tailored for you
          </h1>
          <div className="flex gap-2">
            <p className="font-semibold text-sm">Home</p>
            <ChevronRight className="text-stone-500" />
            <p className="font-semibold text-sm text-stone-500">Team</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 lg:flex-row">
          <div className="flex-1 overflow-hidden">
            <img
              src="./src/assets/images/team-shop-1.png"
              alt=""
              className="w-full lg:h-[calc(100%-1.25rem)] object-cover"
            />
          </div>

          <div className="flex gap-2 flex-1">
            <div className="flex flex-col gap-2 flex-1">
              <div className="aspect-square overflow-hidden">
                <img
                  src="./src/assets/images/team-shop-2.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square overflow-hidden">
                <img
                  src="./src/assets/images/team-shop-3.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <div className="aspect-square overflow-hidden">
                <img
                  src="./src/assets/images/team-shop-4.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square overflow-hidden">
                <img
                  src="./src/assets/images/team-shop-5.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="py-12 flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold w-1/2 text-center">
            Meet Our Team
          </h1>
        <div className="flex flex-col items-center justify-center lg:flex-row lg:flex-wrap">
          
          {members.map((member) => {
            return (
              <TeamMemberCard
                key={member.id}
                title={member.title}
                image={member.image}
              />
            );
          })}
        </div>
      </main>

      <section className="flex flex-col text-center items-center justify-center gap-8 py-24">
        <h1 className="font-bold text-4xl w-3/4">
          Start your 14 days free trial
        </h1>
        <p className="text-stone-600 font-medium text-sm w-3/4 lg:w-1/4">
          Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
          RELIT official consequent.
        </p>
        <button className="text-white text-sm font-semibold bg-sky-500 px-4 py-3 rounded">
          Try it free now
        </button>
        <div className="flex text-2xl items-center justify-center gap-4">
          <FontAwesomeIcon icon={faTwitter} className="text-blue-500" />
          <FontAwesomeIcon icon={faFacebook} className="text-blue-700" />
          <FontAwesomeIcon icon={faInstagram} />
          <FontAwesomeIcon icon={faLinkedin} className="text-blue-500" />
        </div>
      </section>

      <Footer />
    </section>
  );
}
