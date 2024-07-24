import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

interface FrontMatter {
  title: string;
  description: string;
  slug: string;
  content: string;
}

function extractFrontMatter(markdown: string): FrontMatter {
  const match = markdown.match(/^---\n([\s\S]+?)\n---/);
  if (match) {
    const frontMatter = match[1];
    const content = markdown.slice(match[0].length);

    const lines = frontMatter.split("\n");
    const data: Record<string, string> = {};
    lines.forEach((line) => {
      const [key, ...rest] = line.split(": ");
      data[key] = rest.join(": ").trim();
    });

    return {
      title: data.title || "Untitled",
      description: data.description || "",
      slug: data.slug || "",
      content,
    };
  }

  return {
    title: "Untitled",
    description: "",
    slug: "",
    content: markdown,
  };
}

function parseMarkdown(markdown: string): string {
  let html = markdown;

  // Replace headings
  html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
  html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
  html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");

  // Replace bold text
  html = html.replace(/\*\*(.*)\*\*/gim, "<b>$1</b>");

  // Replace italic text
  html = html.replace(/\*(.*)\*/gim, "<i>$1</i>");

  // Replace links
  html = html.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>');

  // Replace "---" and "***" with <hr>
  html = html.replace(/^\*\*\*\*$/gim, "<hr>");
  html = html.replace(/^\*\*\*$/gim, "<hr>");
  html = html.replace(/^---$/gim, "<hr>");

  // Replace new lines with <br>
  html = html.replace(/\n/gim, "<br>");

  return html.trim();
}

function splitContent(content: string, linesPerPage: number): string[] {
  // Split content into sections based on "---" or "***"
  const sections = content.split(/(?:\n---\n|\n\*\*\*\*\n|\n\*\*\*\n)/);
  const pages: string[] = [];

  let currentPage = "";
  let lineCount = 0;

  sections.forEach((section) => {
    const sectionLines = section.split("\n");
    sectionLines.forEach((line) => {
      if (lineCount >= linesPerPage) {
        pages.push(currentPage);
        currentPage = "";
        lineCount = 0;
      }
      currentPage += line + "\n";
      lineCount++;
    });
    if (currentPage.trim()) {
      pages.push(currentPage);
      currentPage = "";
    }
  });

  // Ensure no empty pages are added
  return pages.filter((page) => page.trim().length > 0);
}

export const handler: Handlers = {
  async GET(req, ctx) {
    const { slug } = ctx.params;
    const url = new URL(req.url);
    const pageParam = url.searchParams.get("page");
    const pageNumber = parseInt(pageParam || "1", 10);

    if (!slug) {
      return ctx.renderNotFound();
    }

    try {
      const markdown = await Deno.readTextFile(`./content/${slug}.md`);
      const { title, description, content } = extractFrontMatter(markdown);

      // Define number of lines per page
      const linesPerPage = 500; // Adjust as needed
      const pages = splitContent(content, linesPerPage);

      const totalPages = pages.length;
      const pageIndex = Math.max(0, Math.min(pageNumber - 1, totalPages - 1));

      // Handle invalid page number
      if (pageNumber < 1 || pageNumber > totalPages) {
        return ctx.renderNotFound();
      }

      const htmlContent = parseMarkdown(pages[pageIndex]);

      return ctx.render({
        title,
        description,
        htmlContent,
        pageNumber,
        totalPages,
      });
    } catch (e) {
      console.error(e);
      return ctx.renderNotFound();
    }
  },
};

export default function BlogPage({ url, data }: PageProps) {
  if (!data) {
    return (
      <>
        <Head>
          <title>Not Found</title>
        </Head>
        <div class="min-h-screen flex items-center justify-center bg-gray-100">
          <div class="text-center">
            <h1 class="text-3xl font-bold mb-4">404 - Page Not Found</h1>
            <p class="text-lg">The page you are looking for does not exist.</p>
          </div>
        </div>
      </>
    );
  }

  const { title, description, htmlContent, pageNumber, totalPages } = data;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url.href} />
        <link rel="stylesheet" href="/app.css" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url.href} />
        <meta
          property="og:image"
          content="https://img.sanweb.info/ft/ft?name=Kavithai"
        />
        <meta property="og:image:alt" content="Happy Friendship Day" />
        <meta property="og:image:width" content="1080" />
        <meta property="og:image:height" content="1080" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:url" content={url.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content="https://img.sanweb.info/ft/ft?name=Kavithai"
        />
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
      <div class="min-h-screen bg-[#BDC581] py-10 px-4">
        <div class="max-w-lg mx-auto bg-pink-200 p-6 rounded-lg shadow-lg">
          <h1 class="text-lg font-bold mb-6 text-center">{title}</h1>
          <p class="text-lg mb-6 text-center">{description}</p>
          <div class="prose max-w-none bg-yellow-100 p-6 rounded-lg shadow-sm">
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </div>
          <div class="flex justify-between mt-6 items-center">
            <a
              href={`?page=${pageNumber - 1}`}
              class={`pagination-btn ${pageNumber === 1 ? "disabled" : ""}`}
              aria-disabled={pageNumber === 1 ? "true" : "false"}
            >
              &laquo;
            </a>
            <span class="pagination-info">
              Page {pageNumber} of {totalPages}
            </span>
            <a
              href={`?page=${pageNumber + 1}`}
              class={`pagination-btn ${
                pageNumber === totalPages ? "disabled" : ""
              }`}
              aria-disabled={pageNumber === totalPages ? "true" : "false"}
            >
              &raquo;
            </a>
          </div>
        </div>
      </div>
      <style jsx>
        {`
        .pagination-container {
           display: flex;
           justify-content: space-between;
           align-items: center;
           margin-top: 1.5rem;
           flex-wrap: wrap; /* Allows items to wrap on smaller screens */
           gap: 0.5rem; /* Adds spacing between items */
        }
      .pagination-btn {
        display: inline-block;
        padding: 10px 20px;
        border-radius: 8px;
        background-color: #4a90e2;
        color: #fff;
        text-decoration: none;
        font-weight: bold;
        text-align: center;
        transition: background-color 0.3s;
        flex: 1 1 auto; /* Allows the button to grow or shrink */
        min-width: 100px; /* Ensures buttons have a minimum width */
      }  

     .pagination-btn:hover:not(.disabled) {
       background-color: #357abd;
      }
    .pagination-btn.disabled {
       background-color: #ccc;
      pointer-events: none;
    }
   .pagination-info {
      font-size: 1rem;
      color: #333;
      text-align: center;
      flex: 1 1 auto; /* Allows the info to grow or shrink */
      min-width: 100px; /* Ensures info has a minimum width */
    }
  /* Responsive adjustments */
   @media (max-width: 600px) {
    .pagination-container {
      flex-direction: column;
      align-items: stretch;
    }
    .pagination-btn {
      margin: 0.5rem 0; /* Stacks buttons vertically with spacing */
    }
    .pagination-info {
      margin: 0.5rem 0; /* Adds spacing around info when stacked */
    }
  }
  `}
      </style>
    </>
  );
}
