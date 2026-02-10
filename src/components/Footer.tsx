// export default function Footer4({footerBrand, linkedinURL, githubURL}: {footerBrand: string, linkedinURL: string, githubURL  : string}) {
export default function Footer() {  
return (
    <footer className="w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
          
          {/* <p className="text-sm text-center sm:text-left text-slate-500 dark:text-slate-400">
            Weather Dashboard 
          </p> */}

          {/* Social icons */}
          {/* <div className="flex items-center justify-center sm:justify-start gap-4 sm:gap-6"> */}
            
            {/* LinkedIn */}
            {/* <a
              href={linkedinURL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-slate-500 dark:text-slate-400
                         hover:text-[#0A66C2] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="currentColor"
              >
                <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 24h5V7H0v17zM8 7h4.8v2.3h.1c.7-1.3 2.4-2.7 4.9-2.7 5.2 0 6.2 3.4 6.2 7.8V24h-5v-7.7c0-1.8 0-4.1-2.5-4.1s-2.9 2-2.9 4V24H8V7z" />
              </svg>
            </a> */}

            {/* GitHub */}
            {/* <a
              href={githubURL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-slate-500 dark:text-slate-400
                         hover:text-slate-900 dark:hover:text-white
                         transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="currentColor"
              >
                <path d="M12 0.3C5.37 0.3 0 5.67 0 12.3c0 5.29 3.438 9.776 8.205 11.366.6.113.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.082-.73.082-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.76-1.605-2.665-.304-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.49 11.49 0 0 1 3.003-.404c1.02.005 2.047.138 3.003.404 2.29-1.552 3.296-1.23 3.296-1.23.653 1.653.242 2.873.118 3.176.77.84 1.234 1.91 1.234 3.22 0 4.61-2.805 5.623-5.476 5.92.43.37.823 1.096.823 2.21 0 1.594-.014 2.88-.014 3.27 0 .32.216.694.825.576C20.565 22.073 24 17.587 24 12.3 24 5.67 18.63 0.3 12 0.3z" />
              </svg>
            </a> */}

          {/* </div> */}
        </div>
      </div>
    </footer>
  );
}
