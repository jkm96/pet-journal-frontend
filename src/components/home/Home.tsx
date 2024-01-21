import React from "react";
import MainNavbar from "@/components/shared/navs/navbar/MainNavbar";
import {NAVIGATION_LINKS} from "@/boundary/configs/navigationConfig";
import {Button} from "@nextui-org/react";
import ArchiveIcon from "@/components/home/icons/ArchiveIcon";
import BackupIcon from "@/components/home/icons/BackupIcon";
import DownloadIcon from "@/components/home/icons/DownloadIcon";
import CustomizeIcon from "@/components/home/icons/CustomizeIcon";
import PrintIcon from "@/components/home/icons/PrintIcon";
import WebAppIcon from "@/components/home/icons/WebAppIcon";
import SupportIcon from "@/components/home/icons/SupportIcon";
import MemoriesIcon from "@/components/home/icons/MemoriesIcon";

export default function Home() {
    return (
        <>
            <MainNavbar/>

            <main className="relative pt-10">
                <div className="bg-gray-50">
                    <div className="relative overflow-hidden">
                        <div className="relative pt-8 sm:pt-24 pb-16 sm:pb-24">
                            <div className="mx-auto max-w-5xl px-4 sm:px-6">
                                <div className="text-center">
                                    <h1 className="animate__animated animate__fadeIn text-3xl sm:text-5xl md:text-6xl tracking-tight font-extrabold text-black-2">
                                        <span className="block">Your Pet Photo Diary</span><span
                                        className="block text-primary">digital &amp; print</span></h1>
                                    <div
                                        className="mt-3 max-w-md mx-auto text-base text-gray-700 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl animate__animated animate__fadeIn">

                                        <div className="flex justify-center">
                                            <div className="">

                                                <p className="text-body"><b>Save your daily memories, download them at
                                                    any time, and print them
                                                    beautifully.</b></p>

                                                <div className="">
                                                    <a href={NAVIGATION_LINKS.REGISTER}
                                                       className="mt-8 mb-0 px-8 py-4 inline-block text-center border border-transparent
                                                        rounded-md font-medium text-white bg-orange-500 hover:bg-orange-600">
                                                        <Button color="primary" size="lg" className="text-lg">Start with
                                                            Pet Diaries</Button>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="bg-gray-50">
                    <div className="max-w-7xl mx-auto py-0 px-4 sm:px-6">
                        <div className="max-w-3xl mx-auto text-center">
                            <p className="mt-2 text-3xl font-extrabold text-black-2 sm:text-4xl lg:text-5xl">
                                Discover the Unique Advantages of Pet Diaries
                            </p>
                            <p className="mt-4 text-lg text-gray-500">
                                Capture and cherish every moment with your pet through our feature-packed online pet
                                diary!
                            </p>
                        </div>

                        <dl className="mt-4 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-8">
                            <div className="relative">
                                <dt>
                                    <MemoriesIcon/>
                                    <p className="ml-9 text-lg leading-6 font-medium text-black-2">Centralized Pet
                                        Memories</p>
                                </dt>
                                <dd className="mt-2 ml-9 text-base text-gray-500">Bring all your pet memories together
                                    on a chronological timeline, with unlimited storage for photos and text entries.
                                    Easily navigate through time to relive those precious moments.
                                </dd>
                            </div>

                            <div className="relative">
                                <dt>
                                    <ArchiveIcon/>
                                    <p className="ml-9 text-lg leading-6 font-medium text-black-2">Effortless Automatic
                                        Archive</p>
                                </dt>
                                <dd className="mt-2 ml-9 text-base text-gray-500">Enjoy the convenience of Pet Diaries
                                    creating an automatic archive, sorted by years and months. Easily filter entries by
                                    periods and pets, making it a breeze to revisit specific moments.
                                </dd>
                            </div>

                            <div className="relative">
                                <dt>
                                    <CustomizeIcon/>
                                    <p className="ml-9 text-lg leading-6 font-medium text-black-2">Personalized
                                        Experience</p>
                                </dt>
                                <dd className="mt-2 ml-9 text-base text-gray-500">Tailor your pet diary to reflect your
                                    unique style. Customize backgrounds, fonts, and add stickers, avatar pictures, and
                                    text memories to make it truly yours.
                                </dd>
                            </div>

                            <div className="relative">
                                <dt>
                                    <DownloadIcon/>
                                    <p className="ml-9 text-lg leading-6 font-medium text-black-2">
                                        Effortless Downloads
                                    </p>
                                </dt>
                                <dd className="mt-2 ml-9 text-base text-gray-500">
                                    Download your pet diary effortlessly as a beautifully designed PDF.
                                    Choose specific entries to include and share with friends or print it
                                    out for a tangible keepsake.
                                </dd>
                            </div>

                            <div className="relative">
                                <dt>
                                    <PrintIcon/>
                                    <p className="ml-9 text-lg leading-6 font-medium text-black-2">
                                        Automated Printing
                                    </p>
                                </dt>
                                <dd className="mt-2 ml-9 text-base text-gray-500">
                                    Experience the convenience of printing high-end photobooks with just a few clicks.
                                    Combine entries seamlessly to create unique and personalized photo books
                                    that capture your cherished memories.
                                </dd>
                            </div>

                            <div className="relative">
                                <dt>
                                    <BackupIcon/>
                                    <p className="ml-9 text-lg leading-6 font-medium text-black-2">
                                        Guaranteed Backup
                                    </p>
                                </dt>
                                <dd className="mt-2 ml-9 text-base text-gray-500">
                                    Worried about losing memories? Pet Diaries guarantees the safety of your precious
                                    moments.
                                    Your memories are hosted with GDPR compliance and backed up using the highest
                                    technology standards.
                                </dd>
                            </div>

                            <div className="relative">
                                <dt>
                                   <WebAppIcon/>
                                    <p className="ml-9 text-lg leading-6 font-medium text-black-2">
                                        Advantage Web App
                                    </p>
                                </dt>
                                <dd className="mt-2 ml-9 text-base text-gray-500">
                                    Access your pet diaries seamlessly across different devices!
                                    Pet Diaries functions as a web app in your browser.
                                    Your diary is always up to date, ensuring a consistent experience on all your
                                    devices.
                                </dd>
                            </div>

                            <div className="relative">
                                <dt>
                                    <SupportIcon/>
                                    <p className="ml-9 text-lg leading-6 font-medium text-black-2">Personal Support</p>
                                </dt>
                                <dd className="mt-2 ml-9 text-base text-gray-500">
                                    Have questions, concerns, or ideas?
                                    Reach out to us! Our team is dedicated to providing personal support.
                                    Your satisfaction is our priority. We ensure you have the best experience with Pet
                                    Diaries.
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </main>
        </>
    )
}