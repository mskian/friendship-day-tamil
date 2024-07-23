import { useState, useEffect } from "preact/hooks";

interface APIData {
  slug: string;
  content: string;
}

interface Props {
  data: APIData[];
}

export default function AddProject({ data }: Props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = `https://img.sanweb.info/ft/ft?name=${data[0].slug}`;
    img.onload = () => {
      setTimeout(() => {
        setLoading(false);
      }, 1000); // Adding a delay of 1 second
    };
  }, [data]);

  return (
    <div class="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      {loading ? (
        <div class="flex justify-center items-center min-h-screen">
          <svg
            class="animate-spin h-10 w-10 text-purple-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
        </div>
      ) : (
        <img
          src={`https://img.sanweb.info/ft/ft?name=${data[0].slug}`}
          alt={data[0].content}
          loading="lazy"
          class="mx-auto max-w-full h-auto rounded-lg shadow-lg"
        />
      )}
      <div class="flex justify-center items-center mt-5 space-x-4">
        <a
          class="bg-purple-600 hover:bg-purple-700 rounded-md py-2 px-8 text-white transition-colors focus:outline-none outline-none font-bold shadow-md"
          href={`https://img.sanweb.info/dl/file?url=https://img.sanweb.info/ft/ft?name=${data[0].slug}`}
          target="_blank"
          rel="nofollow noreferrer noopener"
        >
          📥
        </a>
        <a
          class="bg-green-600 hover:bg-green-700 rounded-md py-2 px-8 text-white transition-colors focus:outline-none outline-none font-bold shadow-md"
          href="/"
        >
          👉 Create
        </a>
      </div>
      <br></br>
      <br></br>
      <div class="flex justify-center items-center">
      <a href="https://fresh.deno.dev/" target="_blank" rel="nofollow noopener noreferrer">
      <img src="/fresh.svg" alt="Deno Fresh" class="w-40" loading="lazy" />
      </a>
      </div>
      <br></br>
    </div>
  );
}
