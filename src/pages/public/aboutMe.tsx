// import { Phone, Mail } from "lucide-react";

// const AboutMe = () => {
//   const email = "sushantkhadka23@proton.me";
//   const phoneNumber = "+977 9862036112";

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-bg dark:bg-bg-dark">
//       <div className="max-w-2xl w-full px-6 py-12 md:py-16 font-nunito">
//         <div className="max-w-xl mx-auto">
//           <h1 className="font-josefin font-medium text-3xl md:text-4xl mb-12 text-title dark:text-title-dark -ml-2">
//             about
//           </h1>

//           <div className="space-y-8 text-base md:text-lg text-text dark:text-text-dark text-center">
//             <p className="leading-relaxed">
//               Hello there, I am Sushant Khadka, and this is my personal blogging
//               and thought-sharing platform, where I express my views and
//               opinions.
//             </p>

//             <p className="leading-relaxed">
//               Given my education in Computer Science and Information Technology
//               (BSc.CSIT), I believe it helps clarify my interests and shapes the
//               content I share here. You'll find a mix of both technical and
//               non-technical topics, as I’m deeply fascinated by technical
//               subjects, but also enjoy exploring broader ideas.
//             </p>

//             <p className="leading-relaxed">
//               You will also find some of my personal thoughts shared here. These
//               are solely my perspectives, with no intention of harming anyone or
//               anything. They are presented based on my observations and analysis
//               (and they might be incorrect as well). Sometimes, I like to refer
//               to these thoughts as{" "}
//               <span className="font-medium text-title dark:text-title-dark">
//                 "scribble."
//               </span>
//             </p>

//             <p className="leading-relaxed">
//               If, by any chance, my content provokes someone or something,
//               please feel free to message me, or you could help me identify any
//               mistakes in my words, and I will respond accordingly.
//             </p>
//           </div>

//           <div className="mt-16 text-center">
//             <h2 className="font-josefin text-xl md:text-2xl mb-8 text-title dark:text-title-dark">
//               Contact Me
//             </h2>

//             <div className="space-y-6 flex flex-col items-center">
//               <a
//                 href={`https://wa.me/${phoneNumber.replace(/\D/g, "")}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center group hover:opacity-80 transition-opacity"
//               >
//                 <Phone className="w-6 h-6 text-[#075E54] dark:text-[#25D366] mr-4" />
//                 <span className="text-[#075E54] dark:text-[#25D366]">
//                   Chat with me on WhatsApp
//                 </span>
//               </a>

//               <a
//                 href={`mailto:${email}`}
//                 className="flex items-center group hover:opacity-80 transition-opacity"
//               >
//                 <Mail className="w-6 h-6 text-blue-500 dark:text-blue-400 mr-4" />
//                 <span className="text-blue-500 dark:text-blue-400">
//                   Send me an email
//                 </span>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutMe;


const AboutMe = () => {
  return (
    <div className="min-h-screen bg-bg dark:bg-bg-dark flex justify-center">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex justify-center">
          <div className="space-y-10 max-w-3xl w-full">
            <div className="border-b border-gray-300 dark:border-gray-700 pb-8">
              <article className="space-y-6">
                <header className="space-y-4 text-center">
                  <h1 className="text-2xl sm:text-3xl font-medium text-title dark:text-title-dark font-josefin">
                    This site is being reconstructed.
                  </h1>
                  <p className="text-text dark:text-text-dark text-lg sm:text-xl font-nunito">
                    I am currently hoping to share my thoughts and blogging content related to topics I am interested in. For now, the site is under construction.
                    <strong className="font-josefin text-xl">Thank you</strong>
                  </p>
                </header>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;

