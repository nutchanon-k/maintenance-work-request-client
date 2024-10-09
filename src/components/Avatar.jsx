import React from 'react'
import { DropDownIcon } from '../icons/Icons'
import defaultProfile from '../assets/defaultProfile.png'

const Avatar = (props) => {
    const {imgSrc, menu , ...restProps } = props
	return (
		<div className="avatar items-center cursor-pointer">
			<div {...restProps}>
				<img src={imgSrc ?? defaultProfile } />
			</div>
			{ menu && 
					<DropDownIcon className="absolute -bottom-2 -right-1 w-4"/>
			}
		</div>
	)
}

export default Avatar