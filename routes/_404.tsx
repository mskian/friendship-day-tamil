import { Head } from "$fresh/runtime.ts";

export function ServerCodePage(
  props: { serverCode: number; codeDescription: string },
) {
  return (
    <>
      <Head>
        <title>{props.serverCode} - Page Not Found</title>
        <meta
          name="description"
          content="The page you're looking for doesn't exist."
        />
        <meta
          property="og:image"
          content="https://img.sanweb.info/ft/ft?name=404"
        />
        <meta property="og:image:alt" content="Page Not Found" />
        <meta property="og:image:width" content="1080" />
        <meta property="og:image:height" content="1080" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${props.serverCode} Error`} />

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
        <meta name="theme-color" content="#FFFFFF" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Friendship Day" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Friendship Day" />
        <link rel="stylesheet" href="/app.css" />
      </Head>

      <main class="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
        <div class="text-center max-w-2xl">
          <div class="mb-8">
            <h1 class="text-8xl md:text-9xl font-bold text-gray-800 mb-4">
              {props.serverCode}
            </h1>
            <h2 class="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
              {props.codeDescription}
            </h2>
          </div>

          <div class="space-y-6">
            <p class="text-gray-600 text-lg">
              The page you're looking for might have been removed, had its name changed, 
              or is temporarily unavailable.
            </p>
            
            <div class="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/"
                class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Go to Homepage
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default function PageNotFound() {
  return (
    <ServerCodePage
      serverCode={404}
      codeDescription={"Oops! Page Not Found"}
    />
  );
}
