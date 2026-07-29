export default function PageJumbo({ title, description}: { title: string, description: string }) {
    return (
        <section className="relative pt-44 pb-20 sm:py-32 bg-green-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl">
                    <h1 className="text-5xl md:text-7xl font-bold text-white" data-testid="text-work-page-title">
                        {title}
                    </h1>
                    <p className="mt-6 text-xl text-white/90 font-body">
                        {description}
                    </p>
                </div>
            </div>
        </section>
    )
}