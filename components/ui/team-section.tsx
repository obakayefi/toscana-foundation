import TeamCard from "@/components/ui/team-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// todo: remove mock functionality
const boardMembers = [
    { name: "Chief Francis Obasi", position: "Chairman", phone: "07039189063" },
    { name: "Dr. Mrs. Elizabeth Ifeoma Obasi", position: "Secretary", phone: "07038962673" },
    { name: "Comr. Nnamdi Boniface Uche (PhD)", position: "Programmes Manager", phone: "08037655182" },
    { name: "Engr. Kingsley Ogbonna", position: "Member", phone: "08035091190" },
];

export default function TeamSection() {
    return (
        <section className="py-16 md:py-24 bg-muted" data-testid="section-team">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground" data-testid="text-team-title">
                        Meet Our Leadership
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground font-body max-w-2xl mx-auto">
                        Dedicated individuals committed to transforming lives and communities
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {boardMembers.map((member) => (
                        <TeamCard key={member.name} {...member} />
                    ))}
                </div>

                <div className="text-center mt-10">
                    <Link href="/team">
                        <Button variant="outline" data-testid="button-view-team">
                            View Full Team
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
