import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <div className="homepage-first">
        <div className="homepage-coverpic-wrapper">
          <Image className="homepage-coverpic" width={1000} height={350} src="https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAGLgko.img" alt="sahayata cover" />
        </div>
        <div className="homepage-slogan">
          Quick Home Fixes At your Fingertips
        </div>
      </div>
      <div className="homepage-second">
        <h2 className="homepage-second-title">Book Services</h2>
        <div className="service-wrapper">
          <ul>
            <li>Electrician</li>
            <li>Plumber</li>
            <li>oassis</li>
            <li>maddath</li>
            <li>sudip</li>
            <li>khajado</li>
          </ul>
        </div>
      </div>
    </>
  );
}
