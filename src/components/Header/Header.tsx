import React from "react";

{/* 
  Reusable Header Components  
*/}

export interface HeaderProps {
  children?: React.ReactNode
  image?: string
}

const Header: React.FC<React.HTMLAttributes<HTMLDivElement> & HeaderProps> = (props) => {
  return (
    <div>
        <div {...props}>
            { props.image ? <img src={props.image} className="w-10 h-10 rounded"/> : ""}
            {props.children}
        </div>
    </div>
  )
}

export default Header;