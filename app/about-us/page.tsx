import { NavBar } from "@/components/global/navbar";
import Footer from "@/components/global/footer";

export default function AboutUs() {
    return (
        <div>
        <NavBar />
            <div className="h-screen flex flex-col items-center py-24">
            <h1 className="text-5xl">Sobre Nós</h1>
            <h2 className="text-3xl my-4">Conheça mais sobre a BitBus.</h2>
            <p className="p-20 text-xl" >O Bit Bus caracteriza-se como um espaço científico-cultural itinerante voltada à divulgação científica e tecnológica no interior e no entorno de um veículo automotor do tipo ônibus. Por isso, sua denominação une as palavras bit, em referência ao dígito binário, a menor parcela de informação processada por um computador, e bus, sufixo de ônibus, geralmente caracterizado como um veículo de uso coletivo e temporário por um grande número de pessoas.
            A sua missão é promover a formação das pessoas, por meio da construção do conhecimento, com ênfase na área da ciência e tecnologia.
            </p>
            <img src="bitbusimg.jpeg"></img>
            </div>
        <Footer />
        </div>
    );
}