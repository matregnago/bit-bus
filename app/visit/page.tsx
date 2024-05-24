import { NavBar } from "@/components/global/navbar";
import Footer from "@/components/global/footer";

export default function AboutUs() {
    return (
        <div>
        <NavBar />
            <div className="h-screen flex flex-col items-center py-24">
            <h1 className="text-5xl">Visitações</h1>
            </div>
        <Footer />
        </div>
    );
}