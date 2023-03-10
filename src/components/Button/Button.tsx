import React from "react"

{/* Button Props */}
export interface ButtonProps {
  children?: React.ReactNode
}

{/* Reusable Button Component */}

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement & ButtonProps>> = (props) => {
  return (
    <>
        <button {...props}>
            {props.children}
        </button>
    </>
  )
}

export default Button