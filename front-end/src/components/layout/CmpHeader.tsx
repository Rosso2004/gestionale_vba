interface ICmpHeader {
    title?: string
}

const CmpHeader: React.FC<ICmpHeader> = (props) => {
    const {title} = props

    return (
        <nav
            className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        <a href="https://flowbite.com" className="flex ml-2 md:mr-24">
                            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3"
                                 alt="FlowBite Logo"/>
                            <span
                                className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Flowbite</span>
                        </a>
                        <p className="ml-4 text-xl font-medium">{title}</p>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default CmpHeader;