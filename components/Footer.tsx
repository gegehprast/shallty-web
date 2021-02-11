import React from 'react'

interface Props {
    textClass?: string
    linkClass?: string
}

const Footer = ({ textClass, linkClass }: Props): JSX.Element => {
    return (
        <div className="relative flex flex-row justify-center w-screen mx-auto text-sm text-gray-400 md:text-base">
            <div className="flex flex-wrap items-center justify-around w-full px-2 mt-auto mb-8 md:px-8 md:w-11/12 lg:w-5/6 xl:w-1/2">
                <div className={`w-full mt-4 md:w-1/2 md:mt-0 ${textClass}`}>
                    © { (new Date).getFullYear() } shallty.moe {process.env.NEXT_PUBLIC_APP_VERSION}
                </div>
                <div className="order-first w-full md:text-right md:order-none md:w-1/2">
                    <a href="http://bit.ly/ShalltyDiscordServer" className={`truncate transition-colors duration-200 ease-in text-sh-300 hover:text-sh-100 ${linkClass}`} target="_blank" rel="noreferrer">
                        Discord
                    </a>
                    <a href="https://github.com/gegehprast/shallty" className={`ml-4 truncate transition-colors duration-200 ease-in text-sh-300 hover:text-sh-100 ${linkClass}`} target="_blank" rel="noreferrer">
                        Open Source
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Footer
