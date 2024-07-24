import { useEffect, useState } from "preact/hooks";

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
    <div class="min-h-screen flex flex-col justify-center items-center bg-[#e5ddd5] p-6 rounded-lg">
      {loading ? (
        <div class="flex justify-center items-center min-h-screen">
          <svg
            class="animate-spin h-10 w-10 text-green-500"
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
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        </div>
      ) : (
        <img
          src={`https://img.sanweb.info/ft/ft?name=${data[0].slug}`}
          alt={data[0].content}
          loading="lazy"
          class="mx-auto max-w-full h-auto rounded-xl shadow-lg border-2 border-gray-300"
        />
      )}
      <div class="flex justify-center items-center mt-6 space-x-4">
        <a
          class="bg-[#6ab04c] hover:bg-[#1ebe54] rounded-full py-2 px-4 text-white font-semibold shadow-md transition-colors"
          href={`https://img.sanweb.info/dl/file?url=https://img.sanweb.info/ft/ft?name=${data[0].slug}`}
          target="_blank"
          rel="nofollow noreferrer noopener"
        >
          📥 Download
        </a>
        <a
          class="bg-[#273c75] hover:bg-[#0091ea] rounded-full py-2 px-4 text-white font-semibold shadow-md transition-colors"
          href="/"
        >
          👉 Create
        </a>
      </div>
      <div class="flex justify-center items-center mt-8">
        <a
          href="https://github.com/mskian/friendship-day-tamil"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <img src="/fresh.svg" alt="Deno Fresh" class="w-32" loading="lazy" />
        </a>
      </div>
    </div>
  );
}
