import { useSignal } from "@preact/signals";
import { slugify } from "https://deno.land/x/slugify@0.3.0/mod.ts";
import { useEffect } from "preact/hooks";

export default function AddProject() {
  const username = useSignal("");
  const loading = useSignal(true);

  useEffect(() => {
    const img = new Image();
    img.src = "https://img.sanweb.info/ft/ft?name=Your-Name";
    img.onload = () => {
      setTimeout(() => {
        loading.value = false;
      }, 1200); // Adding a delay of 1 second
    };
  }, []);

  const handleSubmit = (e: Event) => {
    e.preventDefault(); // Prevent the default form submission
    if (username.value.trim().length !== 0) {
      const seoUrl = slugify(username.value, {
        replacement: "-",
        remove: /[$*_+~.()'"!\-:@]+/g,
        lower: false,
      }) || "Your-Name";
      console.log(seoUrl);
      const pageCatch = encodeURIComponent(seoUrl).replace(/%20/g, "-");
      window.location.href = `/${pageCatch}`;
    } else {
      console.log("empty input data");
    }
  };

  return (
    <div class="container mx-auto px-4 py-8 min-h-screen bg-gray-100">
      <div class="flex flex-col justify-center items-center">
        {loading.value ? (
          <div class="flex justify-center items-center min-h-screen">
            <svg
              class="animate-spin h-12 w-12 text-purple-600"
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
            src="https://img.sanweb.info/ft/ft?name=Your-Name"
            alt="Happy Friendship Day"
            loading="lazy"
            class="mx-auto max-w-full h-auto rounded-lg shadow-lg"
          />
        )}
        <form onSubmit={handleSubmit} class="mt-6 flex flex-col md:flex-row items-center gap-4">
          <input
            id="username"
            name="username"
            class="text-center rounded-lg p-3 border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
            placeholder="Your Name"
            autoComplete="off"
            onInput={(e) => username.value = (e.target as HTMLInputElement).value}
            value={username.value}
          />
          <button
            type="submit"
            class="px-6 py-3 rounded-lg bg-purple-600 text-white font-bold uppercase border border-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
          >
            Create
          </button>
        </form>
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
