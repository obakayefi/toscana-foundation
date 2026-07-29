"use client"
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/footer";
import CTASection from "@/components/ui/cta-section";
import TeamCard from "@/components/ui/team-card";
import { boardOfTrustees } from "@/lib/data";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const staffList = [
    { name: "Chief Francis Obasi", position: "Chairman / Founder", qualification: "WASC", image: "/team/oga.JPG" },
    { name: "Comr. Nnamdi Boniface Uche", position: "Programmes Manager", qualification: "WASC, OND, B.Ed, M.Ed, PhD", image: "/team/manager.jpeg" },
    { name: "Dr. Mrs. Elizabeth Ifeoma Okolie", position: "Medical Consultant", qualification: "MBBS" },
    { name: "Mrs. Esom Sussan", position: "Finance Officer", qualification: "B.Sc. Accountancy" },
    { name: "Madu Emeka Innocent", position: "ICT Technologist", qualification: "B.Tech" },
    { name: "Barr. Ude Harrison", position: "Legal Adviser", qualification: "WASC, BL, ML", image: "/team/barr-ude.jpeg" },
    { name: "Dr. G. C. Onyebeke", position: "Referral Doctor", qualification: "MBBS" },
];

export default function Team() {
    return (
        <div className="min-h-screen bg-zinc-50">
            <Header />
            <main>
                <section className="relative min-h-[50vh] flex items-center overflow-hidden">
                    <div className="absolute inset-0 bg-green-950">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800/80 to-transparent z-10" />
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] z-10" />
                    </div>
                    
                    <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-3xl"
                        >
                            <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-white leading-tight" data-testid="text-team-page-title">
                                Our <span className="text-green-400">People</span>
                            </h1>
                            <p className="mt-8 text-xl md:text-2xl text-green-50/90 font-light leading-relaxed">
                                Behind every project and every success story is a dedicated team committed to making a difference.
                            </p>
                        </motion.div>
                    </div>
                </section>

                <section className="py-24 relative overflow-hidden" data-testid="section-board">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl -z-10" />
                    
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-zinc-900">Board of <span className="text-green-700">Trustees</span></h2>
                            <p className="mt-4 text-xl text-zinc-500 font-light max-w-2xl mx-auto">
                                Strategic leadership and governance guiding our foundation's vision.
                            </p>
                        </div>
                        
                        <motion.div 
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                        >
                            {boardOfTrustees.map((member) => (
                                <TeamCard key={member.name} {...member} />
                            ))}
                        </motion.div>
                    </div>
                </section>

                <section className="py-24 bg-white relative overflow-hidden" data-testid="section-staff">
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-zinc-100 rounded-full blur-3xl -z-10 opacity-50" />
                    
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-zinc-900">The <span className="text-green-700">Secretariat</span></h2>
                            <p className="mt-4 text-xl text-zinc-500 font-light max-w-2xl mx-auto">
                                Our dedicated team of professionals executing daily operations on the ground.
                            </p>
                        </div>
                        
                        <motion.div 
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                        >
                            {staffList.map((member) => (
                                <TeamCard key={member.name + member.position} {...member} />
                            ))}
                        </motion.div>
                    </div>
                </section>

                <CTASection
                    title="Work With Us"
                    description="Interested in collaborating with the Toscana Foundation? We are always looking for visionary partners."
                    primaryAction={{ label: "Contact the Team", href: "/contact" }}
                    secondaryAction={{ label: "View Our Work", href: "/our-work" }}
                />
            </main>
            <Footer />
        </div>
    );
}
