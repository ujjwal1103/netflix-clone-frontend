// dummy footer
const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-8">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mb-6">
          <ul>
            <li className="mb-2"><span className="hover:underline">FAQ</span></li>
            <li className="mb-2"><span className="hover:underline">Investor Relations</span></li>
            <li className="mb-2"><span className="hover:underline">Privacy</span></li>
            <li className="mb-2"><span className="hover:underline">Speed Test</span></li>
          </ul>
          <ul>
            <li className="mb-2"><span className="hover:underline">Help Center</span></li>
            <li className="mb-2"><span className="hover:underline">Jobs</span></li>
            <li className="mb-2"><span className="hover:underline">Cookie Preferences</span></li>
            <li className="mb-2"><span className="hover:underline">Legal Notices</span></li>
          </ul>
          <ul>
            <li className="mb-2"><span className="hover:underline">Account</span></li>
            <li className="mb-2"><span className="hover:underline">Ways to Watch</span></li>
            <li className="mb-2"><span className="hover:underline">Corporate Information</span></li>
            <li className="mb-2"><span className="hover:underline">Only on Netflix</span></li>
          </ul>
          <ul>
            <li className="mb-2"><span className="hover:underline">Media Center</span></li>
            <li className="mb-2"><span className="hover:underline">Terms of Use</span></li>
            <li className="mb-2"><span className="hover:underline">Contact Us</span></li>
          </ul>
        </div>
        <p className="text-sm">&copy; 2024 Ujjwal Lade, Inc.</p>
      </div>
    </footer>
  );
};

export default Footer;
