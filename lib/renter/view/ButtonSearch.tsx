import { IconsCollection } from '@@/src/constant/icons'
import { Icon } from '@iconify/react'
import React from 'react'

export default function ButtonSearch({
    title,
    onClick = () => console.log("button"),
    type,
    icon = IconsCollection.search
}: {
    title: string,
    onClick?: () => void
    type: 'button' | 'submit',
    icon?: string
}) {
  return (
    <button type={type} onClick={() => onClick()} className="buttonSearch w-full min-w-32">
        <Icon icon={icon}/>
        {title}
    </button>
  )
}
