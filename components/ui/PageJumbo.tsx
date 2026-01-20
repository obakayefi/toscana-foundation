export default function PageJumbo({ title, description}: { title: string, description: string }) {
    return (
        <section className="relative py-20 md:py-32 bg-green-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="w-full">
                    <h1 className="text-4xl md:text-5xl font-bold text-white" data-testid="text-work-page-title">
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