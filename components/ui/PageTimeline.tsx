export default function PageTimeline() {
    return (
        <div>
            <h2 className={'text-sm text-zinc-700'}>JUMP TO YEAR</h2>
            <div className={'text-zinc-500 flex flex-col'}>
                <button className={`${true ? 'border-l-5 border-green-800 text-green-800 font-semibold' : 'buttonl-0'} cursor-pointer pl-3`}>
                    2024
                </button>
                <button className={`${false ? 'border-5 border-green-800 ' : 'pl-0'} pl-3`}>2023</button>
            </div>
        </div>
    )
}