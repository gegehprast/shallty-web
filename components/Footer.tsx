import React from 'react'
import { showToast, dismissToast } from '../utils/toast'

const Footer = (): JSX.Element => {
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()

        dismissToast('IN_DEVELOPMENT')

        showToast(<div className="p-2 text-lg">Sedang dikembangkan.</div>, {
            id: 'IN_DEVELOPMENT',
            type: 'info',
        })
    }
    return (
        <div className="relative flex flex-row flex-wrap items-center justify-center w-screen mx-auto text-gray-400">
            <div className="flex flex-wrap items-center justify-around w-full px-2 mt-auto mb-8 md:px-8 md:w-11/12 lg:w-5/6 xl:w-1/2">
                <div className="w-full mt-4 md:w-1/2 md:mt-0">
                    © 2020 shallty.moe FC-v0.9
                </div>
                <div className="order-first w-full md:text-right md:order-none md:w-1/2">
                    <a href="http://bit.ly/ShalltyDiscordServer" className="truncate transition-colors duration-200 ease-in text-sh-300 hover:text-sh-100" target="_blank" rel="noreferrer">
                        Discord
                    </a>
                    <a href="#" onClick={handleClick} className="ml-4 truncate transition-colors duration-200 ease-in text-sh-300 hover:text-sh-100" target="_blank" rel="noreferrer">
                        Browser Extension
                    </a>
                    <a href="https://github.com/gegehprast/shallty" className="ml-4 truncate transition-colors duration-200 ease-in text-sh-300 hover:text-sh-100" target="_blank" rel="noreferrer">
                        Open Source
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Footer
