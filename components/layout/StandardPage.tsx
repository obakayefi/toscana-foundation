export default function StandardPage ({children}: { children: React.ReactNode }) {
    return (
        <section className="relative py-20 md:py-32 bg-white h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {children}
            </div>
        </section>
    )
}