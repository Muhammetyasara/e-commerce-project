import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

export default function TeamMemberCard({image}){
    return(
        <>
        <div className="flex flex-col gap-5 text-center px-6 py-8 lg:w-1/3">
            <img src={image} alt="" />
            <div className="flex flex-col gap-3">
              <h2 className="font-bold">Username</h2>
              <p className="text-sm text-stone-500 font-medium">Profession</p>
            </div>
            <div className="flex gap-2 items-center justify-center text-xl">
              <FontAwesomeIcon icon={faFacebook} className="text-blue-700" />
              <FontAwesomeIcon icon={faInstagram} className="text-red-500" />
              <FontAwesomeIcon icon={faTwitter} className="text-blue-500" />
            </div>
          </div>
        </>
    )
}