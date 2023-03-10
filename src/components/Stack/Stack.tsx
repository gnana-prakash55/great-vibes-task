import React from 'react'

{/* 

Reusable Stack Components

*/}

export interface StackProps {
  //Add Dynamic Stack Props
}

const Stack: React.FC<React.HTMLAttributes<HTMLDivElement> & StackProps> = (props) => {
  return (
    <div {...props}>
        {props.children}
    </div>
  )
}

export default Stack