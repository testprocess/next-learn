import Image from "next/image";
import styles from "./page.module.css";

import { PrismaClient } from "@prisma/client";
import { useEffect, useState } from "react";

import prisma from "../../lib/prisma";

type PostType = {
  title: string;
  content: string | null;
};

function Post({ title, content }: PostType) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{content}</p>
      <br />
    </div>
  );
}

async function Posts() {
  const getPosts = async () => {
    "use server";
    const posts = await prisma.post.findMany();
    return posts;
  };

  const posts = await getPosts();

  return (
    <div>
      {posts.map((post) => (
        <Post title={post.title} content={post.content}></Post>
      ))}
    </div>
  );
}

function InputPost() {
  async function addPost(formData: FormData) {
    "use server";

    const title: string | any = formData.get("title");
    const content: string | any = formData.get("content");

    const posts = await prisma.post.create({
      data: {
        title: title,
        content: content,
      },
    });
    return posts;
  }

  return (
    <div>
      <form action={addPost}>
        <input type="text" name="title"></input>
        <input type="text" name="content"></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default function Home() {
  return (
    <main className={styles.main}>
      <Posts></Posts>
      <InputPost></InputPost>
    </main>
  );
}
