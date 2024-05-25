import { NavBar } from "@/components/global/navbar";
import Footer from "@/components/global/footer";

export default function AboutUs() {
    return (
        <div>
        <NavBar />
        <title>Sobre Nós</title>
            <div className="flex flex-col items-center py-24">
                <p className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Sobre Nós</p>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400 my-4">Conheça mais sobre a BitBus.</p>
                <p className="p-20 text-xl text-gray-900" >O Bit Bus caracteriza-se como um espaço científico-cultural itinerante voltada à divulgação científica e tecnológica no interior e no entorno de um veículo automotor do tipo ônibus. Por isso, sua denominação une as palavras bit, em referência ao dígito binário, a menor parcela de informação processada por um computador, e bus, sufixo de ônibus, geralmente caracterizado como um veículo de uso coletivo e temporário por um grande número de pessoas.
                A sua missão é promover a formação das pessoas, por meio da construção do conhecimento, com ênfase na área da ciência e tecnologia.
                </p>
                <img
                alt="BitBus Photo"
                className="mx-auto rounded-xl object-cover"
                height="800"
                src="bitbusimg.jpeg"
                width="800"
                />
            </div>
        <Footer />
        </div>
    );
}