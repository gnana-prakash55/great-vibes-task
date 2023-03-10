import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'

{/* 
  Reusable Modal,Input, Radio Components
*/}


export interface ModalProps {
  height?: string
  width?: string
  showModal: boolean
  toggleModal: () => void
  children?: React.ReactNode
  handleOnChange?: React.ChangeEventHandler<HTMLInputElement>
  handleSubmit?: (buttonName: string) => void
}


const Modal: React.FC<ModalProps> = (props) => {

  let { showModal, toggleModal, children, height, width } = props;

  return (
    <Transition appear show={showModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={toggleModal}>
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
                as="div"
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="max-w-md transform overflow-hidden rounded-2xl bg-white p-[32px] text-left align-middle shadow-xl transition-all" style={{ height: height, width: width}}>

                  {children}
                

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

  )
}


export interface InputProps {
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    name?: string
    label?: string
    selfEnd?: boolean
} 

export interface TextInputProps extends InputProps {
    required?: boolean,
    placeholder?: string,
	  validate?: string[],
    type?: string
}

export interface RadioProps extends InputProps {
    value?: number
}


export const TextInput: React.FC<React.HTMLAttributes<HTMLDivElement> & TextInputProps> = (props) => {

  const { name, label, required, placeholder, selfEnd, validate, type } = props;

  const divClasses = 'flex flex-col gap-[4px] text-[14px]'
  const inputClasses = 'border h-[36px] rounded w-full py-[8px] px-[12px]'

  const [checkRequired, setCheckRequired] = useState(false)

  const validateField: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      if(required) {
        if(e.target.value === "") {
			setCheckRequired(true)
        } else {
			setCheckRequired(false)
        }
      }
      props.onChange?.(e)
  }

  return (
    <div className={ selfEnd ? divClasses.concat(" self-end"): divClasses }>
      <label>{label}{required ? <span className='text-[#D86161]'>*</span>: ""}</label>
      <input name={name} onChange={validateField} type={type} className={ validate?.includes(name as string) || checkRequired ? inputClasses.concat(" border-[#D86161] focus:outline-[#D86161] placeholder:text-[#D86161]"): inputClasses.concat(" text-gray-700")} placeholder={placeholder}/>
    </div>
  )
}


export const Radio: React.FC<React.HTMLAttributes<HTMLDivElement> & RadioProps> = (props) => {

  let { onChange, name, label, value } = props;

  return (
    <div className='flex gap-[4px] justify-start items-center'>
        <input type="radio" value={value} name={name} onChange={onChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-[#7A7A7A] focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"/>
        <label className="text-[14px] text-[#7A7A7A]">{label}</label>
    </div>
  )
}


export default Modal


