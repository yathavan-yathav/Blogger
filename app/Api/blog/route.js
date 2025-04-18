import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
const { NextResponse } = require("next/server");
import {writeFile} from 'fs/promises'
const fs = require('fs');

const LoadDB = async()=> {
    await ConnectDB();
};
LoadDB();


//API End point to get all blogs
export async function GET(request) {

    const blogId = request.nextUrl.searchParams.get("id");
    if(blogId){
            const blog = await BlogModel.findById(blogId);
            return NextResponse.json(blog);
    }
    else{
        const blogs = await BlogModel.find({});
    return NextResponse.json({blogs})
    }
}

//API endpoint For Uploading Blogs
export async function POST(request){

    const formData = await request.formData();
    const timestamp = Date.now();

    const image = formData.get('image')
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path= `./public/${timestamp}_${image.name}`;
    await writeFile(path,buffer);
    const imgUrl = `/${timestamp}_${image.name}`;
    
        const blogData = {
            title: `${formData.get('title')}`,
            description:`${formData.get('description')}`,
            content:`${formData.get('content')}`,
            category:`${formData.get('category')}`,
            author:`${formData.get('author')}`,
            image:`${imgUrl}`,
            author_img:`${formData.get('author_img')}`
        }

        await BlogModel.create(blogData);
        console.log("Blog Saved");

        const title = formData.get('title');
        const description=formData.get('description');

        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-email`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description })
        });
        



    return NextResponse.json({success:true, msg:"Blog added"});
}

//Creating API End point to delete blog

export async function DELETE(request){
    const id = await request.nextUrl.searchParams.get('id');
    const blog = await BlogModel.findById(id);
    fs.unlink(`./public${blog.image}`,()=>{});
    await BlogModel.findByIdAndDelete(id);
    return NextResponse.json({msg:"Blog Deleted"})
}