import { Dialog, Transition } from "@headlessui/react";
import { X } from "phosphor-react";
import { Fragment, ReactNode } from "react";

type SidebarProps = {
  title: string;
  onClickEmpty: () => void;
  children: ReactNode;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen?: boolean;
};

export default function Sidebar({
  isOpen,
  setIsOpen,
  children,
  title,
  onClickEmpty,
}: SidebarProps) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex  pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scrollborder-l-2 border-solid bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <div className="flex md:hidden">
                          <X
                            data-cy="X"
                            size={25}
                            onClick={() => setIsOpen(false)}
                          />
                        </div>
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          {title}
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <p
                            className="text-base font-medium underline text-[#6558F5] cursor-pointer"
                            onClick={onClickEmpty}
                          >
                            Esvaziar
                          </p>
                        </div>
                      </div>
                      <div className="mt-8 flex flex-col h-[calc(100vh-108px)]">
                        {children}
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
