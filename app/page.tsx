import { NavBar } from "@/components/global/navbar";
import Footer from "@/components/global/footer";

export default function Home() {
  return (
    <div>
      <NavBar />
      <div>
        <h1 className="p-24">Home Page</h1>
        <p className="p-24">Hi, Marcelo. Show the balls and post in BitBus</p>
      </div>
      <Footer />
    </div>
  );
}
