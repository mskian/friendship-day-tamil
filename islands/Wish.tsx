import { useSignal } from "@preact/signals";
import { slugify } from "https://deno.land/x/slugify@0.3.0/mod.ts";
import { useEffect } from "preact/hooks";

export default function AddProject() {
  const username = useSignal("");
  const loading = useSignal(true);
  const showNotification = useSignal(false); // Add state for notification
  const notificationMessage = useSignal(""); // Add state for notification message

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

    const usernameLength = username.value.trim().length;

    if (usernameLength < 2) {
      showNotification.value = true;
      notificationMessage.value = "Name must be at least 2 characters.";
      setTimeout(() => showNotification.value = false, 3000); // Hide notification after 3 seconds
    } else if (usernameLength > 36) {
      showNotification.value = true;
      notificationMessage.value = "Name must be no more than 36 characters.";
      setTimeout(() => showNotification.value = false, 3000); // Hide notification after 3 seconds
    } else {
      const seoUrl = slugify(username.value, {
        replacement: "-",
        remove: /[$*_+~.()'"!\-:@]+/g,
        lower: false,
      }) || "Your-Name";
      console.log(seoUrl);
      const pageCatch = encodeURIComponent(seoUrl).replace(/%20/g, "-");
      window.location.href = `/${pageCatch}`;
    }
  };

  const handleCloseNotification = () => {
    showNotification.value = false; // Hide notification when close button is clicked
  };

  return (
    <div class="relative container mx-auto px-4 py-8 min-h-screen bg-[#e5ddd8] flex flex-col items-center justify-center rounded-lg">
      <div class="flex flex-col justify-center items-center flex-grow">
        {loading.value
          ? (
            <div class="flex justify-center items-center min-h-screen">
              <svg
                class="animate-spin h-12 w-12 text-green-600"
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
                >
                </circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                >
                </path>
              </svg>
            </div>
          )
          : (
            <img
              src="https://img.sanweb.info/ft/ft?name=Your-Name"
              alt="Happy Friendship Day"
              loading="lazy"
              class="mx-auto max-w-full h-auto rounded-xl shadow-lg"
            />
          )}
        <form
          onSubmit={handleSubmit}
          class="mt-6 flex flex-col items-center gap-4"
        >
          <input
            id="username"
            name="username"
            class="text-center rounded-full p-3 border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            placeholder="Your Name"
            autoComplete="off"
            onInput={(e) =>
              username.value = (e.target as HTMLInputElement).value}
            value={username.value}
          />
          <button
            type="submit"
            class="px-6 py-3 rounded-full bg-green-600 text-white font-bold uppercase border border-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
          >
            Create
          </button>
        </form>
      </div>
      {showNotification.value && (
        <div class="fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 bg-red-600 text-white rounded-lg shadow-lg flex items-center space-x-4">
          <span>{notificationMessage.value}</span>
          <button
            onClick={handleCloseNotification}
            class="bg-red-700 hover:bg-red-800 text-white rounded-full p-1 focus:outline-none"
          >
            &times;
          </button>
        </div>
      )}
      <div class="mt-8 flex justify-center items-center">
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
