"use server";
import { signIn, signOut } from "./auth";
import { Post, User } from "./models";
import { connectDB } from "./utils";
import bcrypt from 'bcrypt';

export const handleGithubLogin = async () => {
  await signIn("github");
};

export const handleLogout = async () => {
  await signOut();
};

export const register = async (previousState,formData) => {
  const {username,email,img,password,passwordRepeat} = Object.fromEntries(formData);
  if(password !== passwordRepeat) {
    return {error: "Password doesn't match"};
  }
  try {
    connectDB();
    const user = await User.findOne({email});
    if(user){
      return {error:"User already exists."};
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    const newUser = new User({
      username,
      email,
      password:hashedPassword,
      img
    });
    await newUser.save();
    console.log("saved to db");
    return {success: true};
  }catch(err) {
    console.log(err);
    return {error: "Failed to register user!"}
  }
};

export const login = async (previousState,formData) => {
  const {username,password} = Object.fromEntries(formData);
  try {
    await signIn("credentials",{username,password});
    return {success: true};
  }catch(err) {
    console.log(err);
    if(err.message.includes("CredentialsSignin")) {
      return {error : "Wrong Credentials"};
    }
    throw err;
  }
};

export const addUser = async (previousState,formData) => {
  const {username,email,password,img} = Object.fromEntries(formData);
  try{
    connectDB();
    const newUser = new User({
      username,
      email,
      password,
      img
    });
    await newUser.save();
    console.log("Post added successfully");
    revalidatePath("/admin")
  }catch(err) {
    console.log(err);
    return {error:"Failed to add post!"}
  }
}

export const deleteUser = async (formData) => {
  const {id} = Object.fromEntries(formData);
  try{
    connectDB();
    await Post.deleteMany({userId:id});
    await User.findByIdAndDelete(id);
    console.log("User deleted successfully");
    // return {success:true};
    revalidatePath("/admin");
  }catch(err) {
    console.log(err);
    return {error : "Failed to delete user"};
  }
};

export const addPost = async (previousState,formData) => {
  const {title,desc,slug,userId} = Object.fromEntries(formData);
  try{
    connectDB();
    const newPost = new Post({
      title,
      desc,
      slug,
      userId
    });
    await newPost.save();
    console.log("Post added successfully");
    revalidatePath("/admin")
  }catch(err) {
    console.log(err);
    return {error:"Failed to add post!"}
  }
}

export const deletePost = async (formData) => {
  const {id} = Object.fromEntries(formData);
  try{
    connectDB();
    await Post.findByIdAndDelete(id);
    console.log("Post deleted successfully");
    // return {success:true};
    revalidatePath("/admin");
  }catch(err) {
    console.log(err);
    return {error : "Failed to delete user"};
  }
}