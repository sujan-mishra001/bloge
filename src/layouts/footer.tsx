export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="max-h-screen bg-bg dark:bg-bg-dark">
      <div className="bg-bg text-text dark:bg-bg-dark dark:text-text-dark py-6 font-josefin">
        <div className="container mx-auto text-center space-y-4">
          {/* Quote Section */}
          <div>
            <p className="text-sm italic">
              "I think, therefore I am." - René Descartes
            </p>
          </div>

          {/* Footer Details */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <p className="text-lg font-semibold text-accent dark:text-accent-dark">
              &copy; {currentYear} Sujan Mishra
            </p>
            <p className="text-sm">
              Thoughts and content are a mix of personal views and external
              influences.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
