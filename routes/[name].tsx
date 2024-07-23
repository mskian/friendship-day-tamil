import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import AddProject from "../islands/User.tsx";

interface APIData {
  slug: string;
  content: string;
}

export const handler: Handlers<APIData[] | null> = {
  async GET(_, ctx) {
    const { name } = ctx.params;
    const resp = await fetch(`https://wishes-five.vercel.app/${name}`);
    if (resp.status === 404) {
      return ctx.render(null);
    }
    const match: APIData[] = await resp.json();
    return ctx.render(match);
  },
};

export default function Page({ data, url }: PageProps<APIData[] | null>) {
  if (!data) {
    return <h1>User not found</h1>;
  }
  return (
    <>
      <Head>
        <title>{`${data[0].content} - நண்பர்கள் தின வாழ்த்துக்கள்`}</title>
        <meta
          name="description"
          content={`${
            data[0].content
          } - Sending you the Happy Friendship Day Greeting Wishes.`}
        />
        <link rel="canonical" href={url.href} />
        <link rel="stylesheet" href="/app.css" />
        <meta
          property="og:title"
          content={`${data[0].content} - நண்பர்கள் தின வாழ்த்துக்கள்`}
        />
        <meta
          property="og:description"
          content={`${
            data[0].content
          } - Sending you the Happy Friendship Day Greeting Wishes.`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url.href} />
        <meta
          property="og:image"
          content={"https://img.sanweb.info/ft/ft?name=" +
            data[0].slug}
        />
        <meta property="og:image:alt" content={data[0].content} />
        <meta property="og:image:width" content="1080" />
        <meta property="og:image:height" content="1080" />
        <link
          rel="icon"
          type="image/png"
          sizes="196x196"
          href="/icons/favicon-196.png"
        />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="/icons/favicon.ico"
        />
        <link rel="apple-touch-icon" href="/icons/apple-icon-180.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Friendship Day" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Friendship Day" />
        <link
          rel="preconnect"
          href="https://img.sanweb.info/"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </Head>
      <main class="min-h-screen px-4 py-16 mx-auto sm:px-6 lg:px-8 bg-gray-200">
        <div class="max-w-lg mx-auto">
          <AddProject data={data} />
        </div>
      </main>
    </>
  );
}
