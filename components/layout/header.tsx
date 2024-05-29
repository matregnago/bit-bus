import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className="flex h-14 items-center justify-between px-4">
        <div className="hidden lg:block">
          <Link href="/" className="flex flex-row items-end">
            <Image
              src="/logo-bitbus.png"
              width={32}
              height={32}
              alt="Picture of the author"
              className="mr-3 ml-3"
            />
            <p className="font-bold text-lg">Bit Bus</p>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <p>ThemeSwitcher</p>
        </div>
      </nav>
    </div>
  );
}
