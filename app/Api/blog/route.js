import { ConnectDB } from "@/lib/config/db";
const { NextResponse } = require("next/server");
import {writeFile} from 'fs/promises'

const LoadDB = async()=> {
    await ConnectDB();
}

LoadDB();



export async function GET(request) {
    
    return NextResponse.json({msg:"API Working"})
}

export async function POST(request){

    const formData = await request.formData();
    const timestamp = Date.now();

    const image = formData.GET('image')
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(ImageByteData);
    const path= `./public/${timestamp}_${image.name}`;
    await writeFile(path,buffer);
    const imgurl = '/${timestamp}_${image.name}';
    console.log(imgurl);
    return NextResponse.json({imgurl})
}