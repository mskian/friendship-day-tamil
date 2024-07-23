import { Head } from "$fresh/runtime.ts";
import AddProject from "../islands/Wish.tsx";
import { PageProps } from "$fresh/server.ts";

export default function NewProject({ url }: PageProps<null>) {
  return (
    <>
      <Head>
        <title>நண்பர்கள் தின வாழ்த்துக்கள் - Friendship Day Greeting Generator</title>
        <meta
          name="description"
          content="Create Happy Friendship Day Greeting Wishes image with Name in Tamil."
        />
        <link rel="canonical" href={url.href} />
        <link rel="stylesheet" href="/app.css" />
        <meta property="og:title" content="நண்பர்கள் தின வாழ்த்துக்கள் - Friendship Day Greeting Generator" />
        <meta
          property="og:description"
          content="Create Happy Friendship Day Greeting Wishes image with Name in Tamil."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url.href} />
        <meta
          property="og:image"
          content="https://img.sanweb.info/ft/ft?name=Your-Name"
        />
        <meta property="og:image:alt" content="Happy Friendship Day" />
        <meta property="og:image:width" content="1080" />
        <meta property="og:image:height" content="1080" />
        <meta name="twitter:title" content="நண்பர்கள் தின வாழ்த்துக்கள் - Friendship Day Greeting Generator" />
        <meta name="twitter:description" content="Create Happy Friendship Day Greeting Wishes image with Name in Tamil." />
        <meta name="twitter:url" content={url.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://img.sanweb.info/ft/ft?name=Your-Name" />
        <link rel="icon" type="image/png" sizes="196x196" href="/icons/favicon-196.png" />
        <link rel="shortcut icon" type="image/x-icon" href="/icons/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/apple-icon-180.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Friendship Day" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Friendship Day" />
        <link rel="preconnect" href="https://img.sanweb.info/" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      <div class="min-h-screen px-4 py-7 mx-auto sm:px-6 lg:px-8 bg-gray-200">
        <div class="max-w-lg mx-auto">
          <AddProject />
        </div>
      </div>
    </>
  );
}
