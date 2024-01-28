"use client";

import { ChangeEvent, Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  StarIcon,
  SparklesIcon,
  ExclamationTriangleIcon,
  QuestionMarkCircleIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import ChatInput from "../../components/ChatInput";
import { FiLogOut } from "react-icons/fi";

const navigation = [
  { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
  { name: "Team", href: "#", icon: UsersIcon, current: false },
  { name: "Projects", href: "#", icon: FolderIcon, current: false },
  { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
  { name: "Documents", href: "#", icon: DocumentDuplicateIcon, current: false },
  { name: "Reports", href: "#", icon: ChartPieIcon, current: false },
];
const teams = [
  { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
  { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
  { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
];

const infos = [
  {
    title: "ምሳሌዎች",
    description: "ስለ ቤተሰብ ህግ ንገረኝ ?",
    icon: SparklesIcon,
  },
  {
    title: "አቅም",
    description: "ይህ ድህረ-ገጽ ሰዎችን ለማገዝ የተሰራ ነው",
    icon: StarIcon,
  },
  {
    title: "ጉድለት",
    description: "በደንብ ማስረዳት አለብዎት",
    icon: ExclamationTriangleIcon,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [inputValue, setInputValue] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);

    if (textareaRef.current) {
      // Reset field height
      textareaRef.current.style.height = "inherit";

      // Get the computed styles for the element
      const computed = window.getComputedStyle(textareaRef.current);

      // Calculate the height
      const height = `${
        textareaRef.current.scrollHeight +
        parseInt(computed.getPropertyValue("border-top-width"), 10) +
        parseInt(computed.getPropertyValue("padding-top"), 10) +
        parseInt(computed.getPropertyValue("padding-bottom"), 10) +
        parseInt(computed.getPropertyValue("border-bottom-width"), 10)
      }px`;

      textareaRef.current.style.height = height;
    }
  };

  return (
    <div>
      <header className="border-bottom-[#D1D5DB] border-b border-gray-300">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 px-6 lg:px-8 border-[#D1D5DB] bottom-2"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Amharic Legal Aid Chatbot</span>
              <Image
                src="legal-aid-logo-small-black.svg"
                alt=""
                width={100}
                height={100}
                priority={true}
                className="h-auto"
              />
            </Link>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-x-6">
            <Link
              href="#"
              className="lg:block lg:text-sm lg:font-semibold lg:leading-6 lg:text-gray-900"
            >
              <div className="flex">
                <p>Help</p>
                <div className="ml-1">
                  <QuestionMarkCircleIcon className="h-6 w-6" />
                </div>
              </div>
            </Link>
            <Link
              href="#"
              className="lg:block lg:text-sm lg:font-semibold lg:leading-6 lg:text-gray-900"
            >
              <div className="flex">
                <p>Logout</p>
                <div className="ml-1">
                  <FiLogOut className="h-6 w-6" />
                </div>
              </div>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex justify-between items-center gap-x-6">
              <Link href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Amharic Legal Aid Chatbot</span>
                <Image
                  src="legal-aid-logo-small-black.svg"
                  alt=""
                  width={100}
                  height={100}
                  priority={true}
                  className="h-auto"
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link
                    href="#"
                    className="lg:block lg:text-sm lg:font-semibold lg:leading-6 lg:text-gray-900"
                  >
                    <div className="flex">
                      <p>Help</p>
                      <div className="ml-1">
                        <QuestionMarkCircleIcon className="h-6 w-6" />
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="py-6">
                  <Link
                    href="#"
                    className="lg:block lg:text-sm lg:font-semibold lg:leading-6 lg:text-gray-900"
                  >
                    <div className="flex">
                      <p>Logout</p>
                      <div className="ml-1">
                        <FiLogOut className="h-6 w-6" />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
      <div
        className="mx-auto flex flex-col lg:px-8 py-3"
        style={{ height: "calc(100vh - 73px)" }}
      >
        <div className="mx-auto">
          <Image
            src="legal-aid-logo-black.svg"
            alt=""
            width={300}
            height={300}
          />
        </div>
        <div
          className="flex justify-center gap-1 flex-wrap"
          style={{ flexGrow: 1 }}
        >
          {infos.map((info, idx) => (
            <div key={idx}>
              <div className={`min-w-[250px] m-3`}>
                <a
                  href="#"
                  className={`block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}
                >
                  <div className="bg-[#F8F8F8] rounded-full w-[90px] h-[90px] flex items-center justify-center mb-2">
                    <info.icon className="h-9 w-9 text-[#919191]" />
                  </div>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {info.title}
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400 underline">
                    {info.description}
                  </p>
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-start rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm">
          <textarea
            ref={textareaRef}
            className="w-full outline-none focus:outline-none resize-none rounded-lg bg-transparent"
            placeholder="ምን ልርዳዎት?"
            value={inputValue}
            onChange={handleInputChange}
            style={{ overflow: "hidden", resize: "none" }}
          />
          <button type="submit" className="self-end mt-2 ml-2">
            <PaperAirplaneIcon
              className="w-8 text-primary"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
