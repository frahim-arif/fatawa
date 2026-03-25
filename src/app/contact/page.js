export const metadata = {
  title: "Contact Us | Maslak e Deoband",
  description: "Contact Maslak e Deoband for Islamic questions or support.",
};

export default function ContactUs() {
  return (
    <div className="py-6 text-gray-800 leading-relaxed space-y-4 text-left">
      <h1 className="text-3xl font-bold text-green-700 mb-4">
        Contact Us
      </h1>

      <p>
        You are welcome to contact us for Islamic questions, fatwa requests,
        feedback, or any support regarding the website.
      </p>

      <h2 className="text-xl font-semibold text-green-700 mt-4">
        Contact Information
      </h2>

      <p>
        <strong>Name:</strong> Frahim Arif Mamud<br />
        <strong>Email:</strong> frahim9900@gmail.com<br />
        <strong>Phone:</strong> +9058596626
      </p>

      <p className="mt-4">
        We try to respond as soon as possible, InshaAllah.
      </p>
    </div>
  );
}
