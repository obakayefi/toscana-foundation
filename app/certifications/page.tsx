import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/Header";
import Image from "next/image";

export default function Certifications() {

    const scumCert = '/certifications/scuml_cert.jpeg'
    const corpCert = '/certifications/corp_cert.jpeg'

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="overflow-hidden">
                <section className="relative py-20 md:py-32 bg-green-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl">
                            <h1 className="text-4xl md:text-5xl font-bold text-white" data-testid="text-about-page-title">
                                Certifications
                            </h1>
                            <p className="mt-6 text-xl text-white/90 font-body">
                                Learn about our journey, mission, and the values that drive our commitment to community development.
                            </p>
                        </div>
                    </div>
                </section>
                <div className="flex gap-4 flex-col sm:flex-row items-start mx-auto lg:ml-0 xl:ml-30 2xl:ml-72 my-10 px-4 w-full">
                    <section className="border-2  border-zinc-100 rounded p-2">
                        <img src={scumCert} className="h-72 w-full object-fit" />
                        <h2 className="text-2xl pt-2">SCUM Certificate</h2>
                        <p className="text-zinc-400">We are able to hold quite an amount of cash in our bank accounts</p>
                    </section>
                    <section className="border-2 border-zinc-100 rounded p-2">
                        <img src={corpCert} className="h-120 w-full object-cover" />
                        <h2 className="text-2xl pl-6 pt-2">Incorporation Certificate</h2>
                        <p className="text-zinc-400 pl-6">With this we are able to conduct our operations legally in Nigeria.</p>
                    </section>
                    {/* <div className="h-[60rem] relative  flex items-center justify-center">
                        <DirectionAwareHover imageUrl={scumCert}>
                            <p className="font-bold text-xl">SCUML Certificate</p>
                            <p className="font-normal text-sm">Grants us rights to hold a decent amount of cash</p>
                        </DirectionAwareHover>
                    </div>

                    <div className="h-[60rem] relative  flex items-center justify-center">
                        <DirectionAwareHover imageUrl={corpCert}>
                            <p className="font-bold text-xl">Corportation Certificate</p>
                            <p className="font-normal text-sm">With this we are legally permitted to conduct business</p>
                        </DirectionAwareHover>
                    </div> */}
                </div>
            </main>

            <Footer />
        </div>
    )
}