"use client"
import CameraComponent from '@/components/camera';
// import Image from 'next/image'
import styles from './page.module.css'
import { useEffect } from 'react'

export default function Home() {
  // useEffect(() => {
  //   const imagePath = "/invoice.jpg"; // relative URL path to the image in the public folder

  //   // Use the imagePath to load the image file
  //   const image = new Image();
  //   image.src = imagePath;

  //   // Do something with the image after it has loaded
  //   image.onload = () => {
  //     console.log("Image loaded successfully");

  //     // Convert the image data to base64-encoded format
  //     const canvas = document.createElement("canvas");
  //     canvas.width = image.width;
  //     canvas.height = image.height;
  //     const context = canvas.getContext("2d");
  //     context!.drawImage(image, 0, 0);
  //     const imageData = canvas.toDataURL("image/jpeg").replace(/^data:image\/(png|jpeg);base64,/, "");
  //     console.log('imageData', imageData)

  //     // Send the image data to the API
  //     const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  //     const requestBody = { image: imageData };
  //     console.log('process.env.API_URL', process.env.NEXT_PUBLIC_API_URL)
  //     fetch(apiUrl!, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(requestBody),
  //     })
  //       .then((response) => response.json())
  //       .then((data) => console.log(data))
  //       .catch((error) => console.error(error));
  //   };
  // }, []);
  // useEffect(() => {
  //   console.log('Hello from the client!')
  //   console.log('process.env.API_URL', process.env.NEXT_PUBLIC_API_URL)
  //   fetch(`${process.env.NEXT_PUBLIC_API_URL}`).then((res) => {
  //     res.json().then((data) => {
  //       console.log('data', data)
  //     })
  //   })
    
  // }, [])
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>app/page.tsx</code>
        </p>
        <div>
          <CameraComponent />
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <img
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <img
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://beta.nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore the Next.js 13 playground.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  )
}
