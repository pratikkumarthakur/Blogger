import { connectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";

const { NextResponse } = require("next/server");
import {writeFile} from 'fs/promises'
const fs = require('fs')

const LoadDB = async () => {
  await connectDB();
};

LoadDB();


//  API endpoints to get all blogs
export async function GET(request) {

  const blogId = request.nextUrl.searchParams.get("id");

  if(blogId){
const blog = await BlogModel.findById(blogId);
return NextResponse.json(blog);
  }else{
    const blogs = await BlogModel.find({})

    return NextResponse.json({ blogs });
  }

  
}


// API Endpoints for uploading Blogs
export async function POST(request) {
  const formData = await request.formData();
  console.log('Form data entries:', Array.from(formData.entries()));
  const timestamp = Date.now();
  const image = formData.get("image");

  if (!image) {
    return NextResponse.json({ error: "No image file provided" }, { status: 400 });
  }
  

  const imageByteData = await image.arrayBuffer();

  const buffer = Buffer.from(imageByteData);
  const path = `./public/${timestamp}_${image.name}`

  await writeFile(path,buffer);
  const imgUrl = `/${timestamp}_${image.name}`

  const blogData = {
    title:`${formData.get('title')}`,
    description:`${formData.get('description')}`,
    category:`${formData.get('category')}`,
    author:`${formData.get('author')}`,
    image:`${imgUrl}`,
    authorImage:`${formData.get('authorImage')}`
    
  }


  await BlogModel.create(blogData);
  console.log("Blog Saved");
  
  return NextResponse.json({success:true , msg:"Blog Added"})

}


// API endpoint to delete the blog.

export async function DELETE(request){
  const id = await request.nextUrl.searchParams.get('id');
  const blog = await BlogModel.findById(id);
  fs.unlink(`./public${blog.image}`,()=>{})
  await BlogModel.findByIdAndDelete(id)
  return NextResponse.json({msg:"Blog Deleted"})
}