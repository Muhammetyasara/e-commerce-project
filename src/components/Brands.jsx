import {
  faAws,
  faHooli,
  faLyft,
  faStripe,
  faPiedPiperHat,
  faReddit,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Brands() {
  return (
    <section className="py-20 flex flex-col gap-4 items-center text-stone-500 lg:flex-row lg:px-32 lg:pt-12 lg:justify-center lg:gap-16">
      <FontAwesomeIcon icon={faHooli} className="text-9xl" />
      <FontAwesomeIcon icon={faLyft} className="text-9xl" />
      <FontAwesomeIcon icon={faPiedPiperHat} className="text-9xl" />
      <FontAwesomeIcon icon={faStripe} className="text-9xl" />
      <FontAwesomeIcon icon={faAws} className="text-9xl" />
      <FontAwesomeIcon icon={faReddit} className="text-9xl" />
    </section>
  );
}
