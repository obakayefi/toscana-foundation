"use client"
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/footer";
import PageJumbo from "@/components/ui/PageJumbo";
import { BiSolidGraduation } from "react-icons/bi";
import { RiToolsFill } from "react-icons/ri";
import Image from "next/image";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const BeneficiaryCard = ({ beneficiary, type }: { beneficiary: any, type: 'academic' | 'youth' }) => (
    <motion.div
        variants={itemVariants}
        whileHover={{ y: -8, transition: { duration: 0.2 } }}
        className="group relative bg-white rounded-[2rem] p-6 shadow-xl shadow-zinc-200/50 border border-zinc-100 flex flex-col items-center text-center transition-all hover:shadow-2xl hover:shadow-green-900/10"
    >
        <div className="relative mb-6">
            <div className="absolute inset-0 bg-green-100 rounded-full scale-110 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative h-28 w-28 rounded-full border-4 border-white shadow-lg overflow-hidden bg-zinc-100">
                {beneficiary.img ? (
                    <Image src={beneficiary.img} fill className="object-cover" alt={beneficiary.name} />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-green-50 text-green-700">
                        {type === 'academic' ? <BiSolidGraduation size={32} /> : <RiToolsFill size={32} />}
                    </div>
                )}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-green-600 text-white p-2 rounded-full shadow-lg">
                {type === 'academic' ? <BiSolidGraduation size={16} /> : <RiToolsFill size={16} />}
            </div>
        </div>

        <h4 className="text-xl font-heading font-bold text-zinc-900 mb-1">{beneficiary.name}</h4>
        
        <div className="inline-flex px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wider mb-4">
            {type === 'academic' ? beneficiary.schoolName : beneficiary.craft}
        </div>

        <p className="text-zinc-500 text-sm font-medium mb-6 flex-grow">
            {type === 'academic' ? beneficiary.course : beneficiary.equipmentGiven}
        </p>

        <div className="w-full pt-4 border-t border-zinc-50 flex justify-between items-center text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            <div>
                <span className="block text-zinc-300 mb-0.5 font-light">Gender</span>
                <span className="text-green-700">{beneficiary.gender}</span>
            </div>
            <div className="text-right">
                <span className="block text-zinc-300 mb-0.5 font-light">Joined</span>
                <span className="text-green-700">{beneficiary.yearJoined}</span>
            </div>
        </div>
    </motion.div>
);

export default function ScholarshipsClient({ beneficiaries }: { beneficiaries: any[] }) {
    // Separate by type and sort by sortOrder (since they were returned sorted from DB, we just filter)
    const academic = beneficiaries.filter(b => b.type === 'academic');
    const youth = beneficiaries.filter(b => b.type === 'youth');

    return (
        <div className="min-h-screen bg-zinc-50">
            <Header />
            <main>
                <PageJumbo
                    title="Scholarships & Empowerment"
                    description="Celebrating the brilliant minds and industrious spirits whose futures were secured through our impact programs."
                />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    {/* Academic Section */}
                    <div className="mb-32">
                        <div className="flex flex-col items-center text-center mb-16">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-green-700 mb-6"
                            >
                                <BiSolidGraduation size={32} />
                            </motion.div>
                            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-zinc-900 mb-4">
                                Educational <span className="text-green-700">Champions</span>
                            </h2>
                            <p className="text-xl text-zinc-500 font-light max-w-2xl">
                                Supporting academic excellence through grants, mentoring, and essential learning resources.
                            </p>
                        </div>

                        {academic.length > 0 ? (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                            >
                                {academic.map((beneficiary: any) => (
                                    <BeneficiaryCard key={beneficiary.id} beneficiary={beneficiary} type="academic" />
                                ))}
                            </motion.div>
                        ) : (
                            <div className="text-center text-zinc-500 py-12">No beneficiaries published yet.</div>
                        )}
                    </div>

                    {/* Youth Empowerment Section */}
                    <div>
                        <div className="flex flex-col items-center text-center mb-16">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-green-700 mb-6"
                            >
                                <RiToolsFill size={32} />
                            </motion.div>
                            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-zinc-900 mb-4">
                                Youth <span className="text-green-700">Empowered</span>
                            </h2>
                            <p className="text-xl text-zinc-500 font-light max-w-2xl">
                                Equipping the next generation of entrepreneurs with the tools and skills for economic independence.
                            </p>
                        </div>

                        {youth.length > 0 ? (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                            >
                                {youth.map((beneficiary: any) => (
                                    <BeneficiaryCard key={beneficiary.id} beneficiary={beneficiary} type="youth" />
                                ))}
                            </motion.div>
                        ) : (
                            <div className="text-center text-zinc-500 py-12">No beneficiaries published yet.</div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
