import { Dialog, Transition } from "@headlessui/react";
import Button from "components/Button/Button";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

type ModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  name?: string;
  onClickSubmitModal: () => void;
  errorMessage?: string;
};

export default function Modal({
  isOpen,
  closeModal,
  name,
  onClickSubmitModal,
  errorMessage,
}: ModalProps) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                {errorMessage ? (
                  <Dialog.Panel className="w-full h-[200px] max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <div className="flex flex-col h-full">
                      <Dialog.Title
                        as="h3"
                        className="text-xl text-center font-medium leading-6 text-slate-900"
                      >
                        Oops!
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-base font-medium text-center mt-5 text-slate-600">
                          {errorMessage}
                        </p>
                      </div>

                      <div className="flex h-full">
                        <Button
                          type="button"
                          className="inline-flex self-end justify-center rounded-md border border-transparen px-4 py-2 text-sm font-medium focus:outline-none"
                          onClick={onClickSubmitModal}
                        >
                          Confirmar
                        </Button>
                      </div>
                    </div>
                  </Dialog.Panel>
                ) : (
                  <Dialog.Panel className="w-[368px] h-[212px] max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <div className="flex flex-col h-full">
                      <Dialog.Title
                        as="h3"
                        className="text-xl text-center font-medium leading-6 text-slate-900"
                      >
                        Obrigado {name}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-base font-medium text-center mt-5 text-slate-600">
                          Sua compra foi finalizada com sucesso!
                        </p>
                      </div>

                      <div className="flex h-full">
                        <Button
                          type="button"
                          className="inline-flex self-end justify-center rounded-md border border-transparen px-4 py-2 text-sm font-medium focus:outline-none"
                          onClick={onClickSubmitModal}
                        >
                          Ir para loja
                        </Button>
                      </div>
                    </div>
                  </Dialog.Panel>
                )}
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
