import { blog_data } from "@/Assets/assets";
import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { log } from "console";
const { NextResponse } = require("next/server");
import {writeFile} from 'fs/promises'
import { title } from "process";

const LoadDB = async()=> {
    await ConnectDB();
}

LoadDB();


//API End point to get all blogs
export async function GET(request) {

    const blogId = request.nextUrl.searchParams.get("id");
    if(blogId){
            const blog = await BlogModel.findById(blogId);
            return NextResponse.json(blog);
    }
    
    const blogs = await BlogModel.find({});

    return NextResponse.json({blogs})
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
            category:`${formData.get('category')}`,
            author:`${formData.get('author')}`,
            image:`${imgUrl}`,
            author_img:`${formData.get('author_img')}`
        }

        await BlogModel.create(blogData);
        console.log("Blog Saved");



    return NextResponse.json({success:true, msg:"Blog added"})
}