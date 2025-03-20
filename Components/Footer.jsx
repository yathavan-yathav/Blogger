import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React from 'react'

const Footer = () => {

  const websiteUrl = 'https://localhost:3000';  //  your actual website URL

  return (
    <div className='flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-black py-5 items-center'>
      <Image src={assets.logo_light} alt='' width={120} />
      <p className='text-sm text-white'>All rights reserved. Copyright @blogger</p>
      <div className='flex gap-4'>
        {/* Facebook */}
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${websiteUrl}`} target="_blank" rel="noopener noreferrer">
          <Image src={assets.facebook_icon} width={60} height={60} alt='Share on Facebook' className="cursor-pointer" />
        </a>

        {/* Twitter (X) */}
        <a href={`https://twitter.com/intent/tweet?url=${websiteUrl} `} target="_blank" rel="noopener noreferrer">
          <Image src={assets.x_icon} width={50} height={50} alt='Share on Twitter' className="cursor-pointer" />
        </a>

        {/* LinkedIn */}
        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${websiteUrl}`} target="_blank" rel="noopener noreferrer">
          <Image src={assets.linkedIn_icon} width={50} height={50} alt='Share on LinkedIn' className="cursor-pointer" />
        </a>
      </div>

    </div>
  )
}

export default Footer