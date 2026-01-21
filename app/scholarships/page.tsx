import Header from "@/components/ui/Header";
import Footer from "@/components/ui/footer";
import PageJumbo from "@/components/ui/PageJumbo";
import { BiSolidGraduation } from "react-icons/bi";
import { GraduationCap } from "lucide-react";
import { RiToolsFill } from "react-icons/ri";
import Image from "next/image";
import { ACADEMIC_BENEFICIARIES, YOUTH_EMPOWERMENT_BENEFICIARIES } from "@/lib/utils";

export default function Scholarships() {
    return (
        <div className="min-h-screen bg-zinc-100">
            <Header />
            <main className={'min-h-screen'}>
                <PageJumbo
                    title={'Scholarships'}
                    description={'Providing scholarships that unlock education, develop talent, and drive lasting impact across communities.'} />

                <div className={'w-6/6 md:w-8/12 px-2 mx-auto mt-15 py-10'}>
                    <div className={'flex flex-col gap-0 mb-20'}>
                        <section className="flex gap-2 border-b-1 border-zinc-200 pb-4 flex-col">
                            <section className={'flex flex-col items-center gap-2'}>
                                <p className={'bg-green-200 rounded-full border-green-300 inline-flex h-12 w-12 items-center justify-center'}>
                                    <BiSolidGraduation className="text-green-700" size="24" />
                                </p>
                                <h2 className={'text-xl md:text-3xl font-semibold text-zinc-800'}>Educational Scholarship
                                    Beneficiaries
                                </h2>
                            </section>
                            <p className={'mt-2 text-center text-zinc-500'}>Brilliant minds whose futures were secured through
                                academic
                                grants, mentoring, and school supplies.</p>
                        </section>

                        <section className={'mt-10 flex flex-col sm:grid sm:grid-cols-2 grid-cols-4 gap-4'}>
                            {ACADEMIC_BENEFICIARIES.map((beneficiary: any) => (
                                <div
                                    className={'flex flex-col w-full border-zinc-300 p-2 duration-300 rounded-xl text-zinc-700 bg-white gap-2'}>
                                    <section
                                        className={'h-24 w-24 flex items-center justify-center mx-auto rounded-full border-2 border-zinc-100 overflow-hidden object-cover'}>
                                        <Image
                                            src={beneficiary?.img}
                                            width={100}
                                            className={'rounded-full mx-auto flex object-cover'} height={100}
                                            alt={'beneficiary'}
                                        />
                                    </section>

                                    <section
                                        className={'flex flex-col py-3 bg-white/80 gap-6 px-4 rounded-lg border-zinc-200'}>
                                        {/*<p className={'text-sm rounded-full px-2 bg-green-100 text-green-800 font-semibold uppercase'}>secondary education</p>*/}
                                        <div className={'flex flex-col items-center gap-2'}>
                                            <h4 className={'text-xl text-center px-2'}>{beneficiary.name}</h4>
                                            <p className={'bg-green-200 font-semibold text-center py-1 px-2 text-xs text-green-800 rounded-full '}>
                                                {beneficiary.schoolName}
                                            </p>
                                            <p className={'text-zinc-300 text-sm'}>{beneficiary.course}</p>
                                        </div>
                                        <section className={'border-t-2 py-2 flex justify-between border-zinc-100'}>
                                            <div className={'text-center'}>
                                                <h6 className={'text-xs text-zinc-300'}>GENDER</h6>
                                                <span
                                                    className='text-green-800 text-center'>{beneficiary.gender[0]}</span>
                                            </div>
                                            <div className={'text-center'}>
                                                <h6 className={'text-xs text-zinc-300'}>JOINED</h6>
                                                <span
                                                    className='text-green-800 text-center'>{beneficiary.yearJoined}</span>
                                            </div>
                                        </section>
                                    </section>
                                </div>
                            ))}
                        </section>
                    </div>

                    <div className={'flex flex-col gap-0'}>
                        <section className="flex gap-2 border-b-1 border-zinc-200 pb-4 flex-col">
                            <section className={'flex flex-col  justify-center items-center gap-2'}>
                                <p className={'bg-green-200 rounded-full border-green-300 inline-flex h-12 w-12 items-center justify-center'}>
                                    <RiToolsFill className="text-green-700" size="24" />
                                </p>
                                <h2 className={'text-xl md:text-3xl font-semibold text-zinc-800'}>Youth Empowerment
                                    Beneficiaries
                                </h2>
                            </section>
                            <p className={'mt-2 text-center  text-zinc-500'}>
                                Providing tools and resources for economic independence and skill mastery.
                            </p>
                        </section>

                        <section className={'mt-10 flex flex-col sm:grid sm:grid-cols-2 grid-cols-4 gap-4'}>
                            {YOUTH_EMPOWERMENT_BENEFICIARIES.map((beneficiary) => (
                                <div
                                    className={'flex flex-col border-zinc-300 p-2 duration-300 rounded-xl text-zinc-700 bg-white gap-2'}>
                                    <section
                                        className={'h-24 w-24 flex items-center justify-center mx-auto rounded-full border-2 border-zinc-100 overflow-hidden object-cover'}>
                                        <Image
                                            src={beneficiary.img}
                                            width={100}
                                            className={'rounded-full mx-auto flex object-cover'} height={100}
                                            alt={'beneficiary'}
                                        />
                                    </section>

                                    <section
                                        className={'flex flex-col py-3 bg-white/80 gap-6 px-4 rounded-lg border-zinc-200'}>
                                        {/*<p className={'text-sm rounded-full px-2 bg-green-100 text-green-800 font-semibold uppercase'}>secondary education</p>*/}
                                        <div className={'flex flex-col items-center gap-2'}>
                                            <h4 className={'text-xl text-center px-2'}>{beneficiary.name}</h4>
                                            <p className={'bg-green-200 font-semibold text-center py-1 px-2 text-xs text-green-800 rounded-full '}>
                                                {beneficiary.craft}
                                            </p>
                                            <p className={'text-zinc-300 text-sm'}>{beneficiary.course}</p>
                                        </div>
                                        <section className={'border-t-2 py-2 flex justify-between border-zinc-100'}>
                                            <div className={'text-left'}>
                                                <h6 className={'text-xs text-zinc-300'}>GENDER</h6>
                                                <span
                                                    className='text-green-800 text-center'>{beneficiary.gender[0]}</span>
                                            </div>
                                            <div className={'text-center'}>
                                                <h6 className={'text-xs text-zinc-300'}>JOINED</h6>
                                                <span
                                                    className='text-green-800 text-right'>{beneficiary.yearJoined}</span>
                                            </div>
                                        </section>

                                        <section>
                                            <div className={''}>
                                                <h6 className={'text-xs text-zinc-300'}>EQUIPMENT GIVEN</h6>
                                                <span
                                                    className='text-green-800 text-left'>{beneficiary.equipmentGiven}</span>
                                            </div>
                                        </section>
                                    </section>
                                </div>
                            ))}
                        </section>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    )
}