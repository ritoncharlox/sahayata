import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <div className="homepage-first">
        <Image className="homepage-coverpic" width={1000} height={350} src="https://images.unsplash.com/photo-1676311396794-f14881e9daaa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="sahayata cover" />
      </div>
    </>
  );
}
