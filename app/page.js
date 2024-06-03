'use client'

export default function Home() {

  const handleClick = () => {
    console.log("Hello");
  }

  return (
    <>
    <h1>Hello</h1>
    <button onClick={handleClick}>Click</button>
    </>
  );
}
