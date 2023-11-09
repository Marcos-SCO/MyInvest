import Image from "next/image";
import {Logo} from "../public/logo.jpeg";

export default async function Navbar() {

 

  return (
    <div className="">
      <div>
        <div className="Logo-Div">
          <Image src="/logo.jpeg" height={150} width={150} alt="Logo" className="Logo-Img1"/>
        </div>
      </div>
    </div>
  );
}