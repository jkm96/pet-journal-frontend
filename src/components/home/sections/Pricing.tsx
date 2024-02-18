import CheckMarkIcon from '@/components/home/icons/CheckMarkIcon';
import { NAVIGATION_LINKS } from '@/boundary/configs/navigationConfig';

export function Pricing() {
  return (
    <section className="bg-white dark:bg-gray-900" id="pricing">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-black-2 dark:text-white">Designed for pet lovers like you</h2>
          <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">Here at PetDiaries we focus on economical and affordable packages</p>
        </div>
        <div className="space-y-8 lg:grid lg:grid-cols-1 sm:gap-6 xl:gap-10 lg:space-y-0">
          {/*Pricing Card*/}
          <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
            <h3 className="mb-4 text-2xl text-black-2 font-semibold">Premium Plan</h3>
            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Billed monthly, extended & premium support.</p>
            <div className="flex justify-center items-baseline my-8">
              <span className="mr-2 text-5xl text-black-2 font-extrabold">$4</span>
              <span className="text-gray-500 dark:text-gray-400">/month</span>
            </div>

            <ul role="list" className="mb-8 space-y-4 text-left">

              <li className="flex items-center space-x-3">
                <CheckMarkIcon className={"flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"}/>
                <span>Magically organized timeline with archive</span>
              </li>

              <li className="flex items-center space-x-3">
                <CheckMarkIcon className={"flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"}/>
                <span>Unlimited storage for your memories</span>
              </li>

              <li className="flex items-center space-x-3">
                <CheckMarkIcon className={"flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"}/>
                <span>PDF Download</span>
              </li>

              <li className="flex items-center space-x-3">
                <CheckMarkIcon className={"flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"}/>
                <span>Highest security standards</span>
              </li>

              <li className="flex items-center space-x-3">
                <CheckMarkIcon className={"flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"}/>
                <span>24/7 Personal support</span>
              </li>

            </ul>
            <a href={NAVIGATION_LINKS.REGISTER}
               className="text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900">
              Get Started
            </a>
          </div>
           </div>
      </div>
    </section>
  )
}