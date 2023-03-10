import React from 'react'

{/* 
  Reusable Card Components  
*/}

export interface CardProps {
  children?: React.ReactNode
}

export interface CardTextProps extends CardProps {
  
}

export interface CardStackProps extends CardProps {
  
}

export interface CardBodyProps extends CardProps {
  
}

export interface CardFooterProps extends CardProps {
  
}

const Card: React.FC<React.HTMLAttributes<HTMLDivElement> & CardProps> = (props) => {
  return (
    <>
        <div {...props}>
            {props.children}
        </div>
    </>
  )
}

const CardImage: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => {
  return (
    <div>
      <img {...props} />
    </div>
  )
}

const CardText: React.FC<React.HTMLAttributes<HTMLDivElement> & CardTextProps> = (props) => {
  return (
    <div {...props}>
        {props.children}
    </div>
  )
}

const CardStack: React.FC<React.HTMLAttributes<HTMLDivElement> & CardStackProps> = (props) => {
  return (
    <div {...props}>
        {props.children}
    </div>
  )
}

const CardBody: React.FC<React.HTMLAttributes<HTMLDivElement> & CardBodyProps> = (props) => {
  return (
    <div {...props}>
        {props.children}
    </div>
  )
}

const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement> & CardFooterProps> = (props) => {
  return (
    <div {...props}>
        {props.children}
    </div>
  )
}

export { 
        Card, 
        CardImage, 
        CardText,
        CardStack,
        CardBody,
        CardFooter 
      }

