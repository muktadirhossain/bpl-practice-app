import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        <Image alt="not-found" height={400} src="/assets/404.png" width={500} />
        <h2 className="text-center text-5xl font-semibold">404 | Not Found</h2>
        <p className="text-center my-4 text-lg">Page not found!</p>

        <Link
          className="block text-center bg-durbarDeep/90 hover:bg-durbarDeep shadow-md shadow-durbarDeep/30 px-5 py-2 rounded-md text-white text-2xl"
          href="/"
        >
          Return Home{" "}
        </Link>
      </div>
    </div>
  );
}
