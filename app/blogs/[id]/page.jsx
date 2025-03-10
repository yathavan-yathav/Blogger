'use client';

import { assets, blog_data } from '@/Assets/assets';
import Footer from '@/Components/Footer';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { use, useEffect, useState } from 'react'

const BlogPage = () => {
    const params = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        if (!params?.id) return;



        const fetchBlogData = async () => {
            try {
                const response = await axios.get('/api/blog', {
                    params: {
                        id: params.id
                    }
                });
                setData(response.data);
            } catch (error) {
                console.error("Error fetching blog data:", error);
            }
        };

        fetchBlogData();
    }, [params.id]);

    if (!data) return <p>Loading...</p>;

    return (data ? <>
        <div className='bg-gray-200  mx-10 py-5 px-5 md:px-12 lg:px-[30px]'>
            <div className='flex justify-between items-center'>
                <Link href='/' >
                    <Image src={assets.logo} width={180} alt='' className='w-[130px] sm:w-auto' />
                </Link>
                <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 bg-white border border-black shadow-[-7px_7px_0px_#000000]'>Get Started
                    <Image src={assets.arrow} alt='' />
                </button>
            </div>
            <div className='text-center my-24'>
                <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{data.title}</h1>
                <Image className='mx-auto mt-6 border border-white rounded-full' src={data.author_img} width={60} height={60} alt='' />
                <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{data.author}</p>
            </div>
        </div>
        <div className='flex flex-col justify-center mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
            <Image className='border-4 border-white' src={data.image} width={1280} height={720} alt='' />
            <h1 className='my-8 text-[26px] font-semibold'>Introduction</h1>
            <p>{data.description}</p>

            {/* <h3 className='my-5 text-[18px] font semibold'>Step:1 Mind the way</h3>
            <p className='my-3'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit doloremque cupiditate voluptatum suscipit commodi ad! Consequuntur, distinctio nobis adipisci sequi sunt ipsum praesentium accusamus minus harum, incidunt nam saepe libero.</p>
            <p className='my-3'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit doloremque cupiditate voluptatum suscipit commodi ad! Consequuntur, distinctio nobis adipisci sequi sunt ipsum praesentium accusamus minus harum, incidunt nam saepe libero.</p>
            <h3 className='my-5 text-[18px] font semibold'>Step:2 Face it the way intendeed</h3>
            <p className='my-3'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit doloremque cupiditate voluptatum suscipit commodi ad! Consequuntur, distinctio nobis adipisci sequi sunt ipsum praesentium accusamus minus harum, incidunt nam saepe libero.</p>
            <p className='my-3'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit doloremque cupiditate voluptatum suscipit commodi ad! Consequuntur, distinctio nobis adipisci sequi sunt ipsum praesentium accusamus minus harum, incidunt nam saepe libero.</p>
            <h3 className='my-5 text-[18px] font semibold'>Step:3 Kill yourself</h3>
            <p className='my-3'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit doloremque cupiditate voluptatum suscipit commodi ad! Consequuntur, distinctio nobis adipisci sequi sunt ipsum praesentium accusamus minus harum, incidunt nam saepe libero.</p>
            <p className='my-3'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit doloremque cupiditate voluptatum suscipit commodi ad! Consequuntur, distinctio nobis adipisci sequi sunt ipsum praesentium accusamus minus harum, incidunt nam saepe libero.</p>
            <h3 className='my-5 text-[18px] font semibold'>Conclusion</h3>
            <p className='my-3'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit doloremque cupiditate voluptatum suscipit commodi ad! Consequuntur, distinctio nobis adipisci sequi sunt ipsum praesentium accusamus minus harum, incidunt nam saepe libero.</p>
             */}

            <p>{data.content}</p>
            <div className='my-24 '>
                <p className='text-black font-semibold my-4'>Share this article on social media</p>
                <div className='flex'>
                    <Image src={assets.facebook_icon} width={50} alt='' />
                    <Image src={assets.twitter_icon} width={50} alt='' />
                    <Image src={assets.googleplus_icon} width={50} alt='' />

                </div>
            </div>
        </div>
        <Footer />
    </> : <></>
    )
}

export default BlogPage;