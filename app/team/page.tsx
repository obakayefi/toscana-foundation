import Header from "@/components/ui/Header";
import Footer from "@/components/ui/footer";
import CTASection from "@/components/ui/cta-section";
import TeamCard from "@/components/ui/team-card";
import { boardOfTrustees } from "@/lib/data";

// todo: remove mock functionality


const staffList = [
    { name: "Chief Francis Obasi", position: "Chairman / Founder", qualification: "WASC", image: "/team/oga.JPG" },
    { name: "Comr. Nnamdi Boniface Uche", position: "Programmes Manager", qualification: "WASC, OND, B.Ed, M.Ed, PhD", image: "/team/manager.jpeg" },
    { name: "Dr. Mrs. Elizabeth Ifeoma Okolie", position: "Medical Consultant", qualification: "MBBS" },
    { name: "Mrs. Esom Sussan", position: "Finance Officer", qualification: "B.Sc. Accountancy" },
    { name: "Madu Emeka Innocent", position: "ICT Technologist", qualification: "B.Tech" },
    // { name: "Engr. Kingsley Ogbonna", position: "Media / Communication Officer", qualification: "WACS, B.Engr, M.Engr" },
    { name: "Barr. Ude Harrison", position: "Legal Adviser", qualification: "WASC, BL, ML", image: "/team/barr-ude.jpeg" },
    { name: "Dr. G. C. Onyebeke", position: "Referral Doctor", qualification: "MBBS" },
];

export default function Team() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main>
                <section className="relative py-20 md:py-32 bg-green-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl">
                            <h1 className="text-4xl md:text-5xl font-bold text-white" data-testid="text-team-page-title">
                                Our Team
                            </h1>
                            <p className="mt-6 text-xl text-white/90 font-body">
                                Meet the dedicated individuals driving our mission forward.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-16 md:py-24" data-testid="section-board">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-foreground">Board of Trustees</h2>
                            <p className="mt-4 text-lg text-muted-foreground font-body">
                                Our governance and leadership team
                            </p>
                        </div>
                        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {boardOfTrustees.map((member) => (
                                <TeamCard key={member.name} {...member} />
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-16 md:py-24 bg-muted" data-testid="section-staff">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-foreground">Staff Members</h2>
                            <p className="mt-4 text-lg text-muted-foreground font-body">
                                Our dedicated team of professionals
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {staffList.map((member) => (
                                <TeamCard key={member.name + member.position} {...member} />
                            ))}
                        </div>
                    </div>
                </section>

                <CTASection
                    title="Join Our Team"
                    description="We are always looking for passionate individuals to join our mission."
                    primaryAction={{ label: "Contact Us", href: "/contact" }}
                    secondaryAction={{ label: "Learn More", href: "/about" }}
                />
            </main>
            <Footer />
        </div>
    );
}
