export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Bharat Bazar</h2>

          <p className="text-sm leading-6 text-gray-400">
            Your trusted online marketplace for fashion, electronics, groceries,
            and everyday essentials at affordable prices.
          </p>

          <div className="flex gap-4 mt-6">
            <div className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 transition cursor-pointer" />
            <div className="w-10 h-10 rounded-full bg-gray-800 hover:bg-pink-500 transition cursor-pointer" />
            <div className="w-10 h-10 rounded-full bg-gray-800 hover:bg-sky-500 transition cursor-pointer" />
            <div className="w-10 h-10 rounded-full bg-gray-800 hover:bg-red-500 transition cursor-pointer" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>

          <ul className="space-y-3 text-sm">
            <li className="hover:text-orange-400 cursor-pointer transition">
              Home
            </li>
            <li className="hover:text-orange-400 cursor-pointer transition">
              Shop
            </li>
            <li className="hover:text-orange-400 cursor-pointer transition">
              Categories
            </li>
            <li className="hover:text-orange-400 cursor-pointer transition">
              Offers
            </li>
            <li className="hover:text-orange-400 cursor-pointer transition">
              Contact Us
            </li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Customer Support
          </h3>

          <ul className="space-y-3 text-sm">
            <li className="hover:text-orange-400 cursor-pointer transition">
              Help Center
            </li>
            <li className="hover:text-orange-400 cursor-pointer transition">
              Returns & Refunds
            </li>
            <li className="hover:text-orange-400 cursor-pointer transition">
              Shipping Policy
            </li>
            <li className="hover:text-orange-400 cursor-pointer transition">
              Privacy Policy
            </li>
            <li className="hover:text-orange-400 cursor-pointer transition">
              Terms & Conditions
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Subscribe</h3>

          <p className="text-sm text-gray-400 mb-4">
            Get updates on new arrivals and exclusive deals.
          </p>

          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-orange-500"
            />

            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Bharat Bazar. All rights reserved.</p>

          <div className="flex gap-4">
            <span className="hover:text-orange-400 cursor-pointer transition">
              Privacy
            </span>

            <span className="hover:text-orange-400 cursor-pointer transition">
              Terms
            </span>

            <span className="hover:text-orange-400 cursor-pointer transition">
              Sitemap
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
