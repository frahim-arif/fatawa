export const metadata = {
  title: "Contact Us | Maslak e Deoband",
  description:
    "Contact Maslak e Deoband for Islamic questions, fatwa requests, feedback, or support.",
};

export default function ContactUs() {
  return (
    <div className="py-6 text-gray-800 dark:text-gray-200 leading-relaxed space-y-4 text-left">
      <h1 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-4">
        Contact Us
      </h1>

      <p className="text-gray-700 dark:text-gray-300">
        You are welcome to contact us for Islamic questions, fatwa requests,
        feedback, or any support regarding the website.
      </p>

      <h2 className="text-xl font-semibold text-green-700 dark:text-green-400 mt-4">
        Contact Information
      </h2>

      <p className="text-gray-700 dark:text-gray-300">
        <strong className="text-gray-900 dark:text-white">Name:</strong>{" "}
        Frahim Arif Mamud Qasmi
        <br />

        <strong className="text-gray-900 dark:text-white">Phone:</strong>{" "}
        <a
          href="tel:9058596626"
          className="text-green-700 dark:text-green-400 hover:underline"
        >
          9058596626
        </a>

        <br />

        <strong className="text-gray-900 dark:text-white">Mufti:</strong>{" "}
        Mufti Daud Qasmi
        <br />

        <strong className="text-gray-900 dark:text-white">Phone:</strong>{" "}
        <a
          href="tel:9557171532"
          className="text-green-700 dark:text-green-400 hover:underline"
        >
          9557171532
        </a>
      </p>

      <p className="mt-4 text-gray-700 dark:text-gray-300">
        We try to respond as soon as possible, InshaAllah.
      </p>
    </div>
  );
}