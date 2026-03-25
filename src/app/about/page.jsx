export const metadata = {
  title: "About Us | Maslak e Deoband",
  description: "Learn about our mission, purpose and Islamic guidance.",
};

export default function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto p-6 text-left ltr py-6 space-y-4 text-gray-800 leading-relaxed">
      
      <h1 className="text-3xl font-bold text-green-700 mb-4">About Us</h1>

      <p>
        Welcome to our Islamic guidance platform dedicated to providing
        authentic, reliable, and scholarly-based information from the Deobandi
        school of thought.
      </p>

      <p>
        My name is <strong>Frahim Arif Mamud</strong>. I am a{" "}
        <strong>Mufti and Qasmi Alim</strong>, trained in the traditional
        Islamic sciences and fatwa writing.
      </p>

      <h2 className="text-xl font-semibold text-green-700 mt-4">
        Our Purpose
      </h2>
      <ul className="list-disc pl-6">
        <li>Provide accurate Islamic answers based on classical sources.</li>
        <li>Help Muslims understand everyday religious matters.</li>
        <li>Share articles, fatawa, and scholarly insights.</li>
        <li>Remove misconceptions and spread authentic Islamic knowledge.</li>
      </ul>

      <h2 className="text-xl font-semibold text-green-700 mt-4">
        Our Sources
      </h2>
      <ul className="list-disc pl-6">
        <li>Classical Hanafi fiqh books</li>
        <li>Recognized Deobandi fatwa collections</li>
        <li>
          Works of scholars from Darul Uloom Deoband, Karachi, Banuri Town, and
          similar institutions
        </li>
        <li>Trusted Islamic libraries and research publications</li>
      </ul>

      <h2 className="text-xl font-semibold text-green-700 mt-4">
        Our Mission
      </h2>
      <ul className="list-disc pl-6">
        <li>Authentic knowledge</li>
        <li>Clear explanations</li>
        <li>Ethical and respectful content</li>
        <li>Classical scholarship in a digital form</li>
      </ul>

      <p className="mt-4">
        For questions, feel free to visit our “Ask Question” page.
      </p>

    </div>
  );
}
