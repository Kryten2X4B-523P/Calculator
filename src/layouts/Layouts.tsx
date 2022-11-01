import React, { ReactElement } from 'react'

interface LayoutsProps {
   children: ReactElement
}

export default function Layouts(props: LayoutsProps): ReactElement {
   return <div className="">{props.children}</div>
}
