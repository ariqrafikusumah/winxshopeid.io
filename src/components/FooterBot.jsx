import React from 'react'
import Logo from '../assets/img/logo-web.png'

function FooterBot() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="p-4 sm:p-6 bg-white xl:px-52 lg:px-32 md:px-5 mt-5">
        <div className="md:flex justify-between">
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center">
              <img src={Logo} className="h-32 mr-3" alt="logo" />
              {/* <span className="self-center text-2xl font-semibold whitespace-nowrap ">Flowbite</span> */}
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">GAME POPULAR</h2>
              <div className="text-gray-600">
                <div className="mb-4">
                  <a href="/order/mobile-legends" className="text-gray-600 no-underline hover:underline">Mobile Legends</a>
                </div>
                <div className="mb-4">
                  <a href="/order/free-fire" className="text-gray-600 no-underline hover:underline">Free Fire</a>
                </div>
              </div>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">PETA SITUS</h2>
              <div className="text-gray-600">
                <div className="mb-4">
                  <a href="/" className="text-gray-600 no-underline hover:underline ">Beranda</a>
                </div>
                <div className="mb-4">
                  <a href="/Tentang" className="text-gray-600 no-underline hover:underline">Tentang</a>
                </div>
              </div>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase ">Legal</h2>
              <div className="text-gray-600">
                <div className="mb-4">
                  <a href="/PrivacyPolicy" className="text-gray-600 no-underline hover:underline">Privacy Policy</a>
                </div>
                <div className="mb-4">
                  <a href="/Terms" className="text-gray-600 no-underline hover:underline">Terms &amp; Conditions</a>
                </div>
              </div>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">PAYMENT</h2>
              <div className="text-gray-600">
                <div className="mb-4 flex items-center">
                  <marquee className="whitespace-nowrap flex-1 w-12">
                    <img className='border-2 border-indigo-500 p-2 rounded-xl w-16 shadow-lg inline-block mr-2' src="https://cdn1.codashop.com/S/content/common/images/mno/DANA_CHNL_LOGO.png" alt="" />
                    <img className='border-2 border-indigo-500 p-2 rounded-xl w-16 shadow-lg inline-block mr-2' src="https://cdn1.codashop.com/S/content/common/images/mno/QRIS_ID_CHNL_LOGO.png" alt="" />
                    <img className='border-2 border-indigo-500 p-2 rounded-xl w-16 shadow-lg inline-block mr-2' src="https://cdn1.codashop.com/S/content/common/images/mno/GO_PAY_CHNL_LOGO.png" alt="" />
                    <img className='border-2 border-indigo-500 p-2 rounded-xl w-16 shadow-lg inline-block mr-2' src="https://cdn1.codashop.com/S/content/common/images/mno/OVO_CHNL_LOGO.png" alt="" />
                    <img className='border-2 border-indigo-500 p-2 rounded-xl w-16 shadow-lg inline-block mr-2' src="https://cdn1.codashop.com/S/content/common/images/mno/SHOPEE_PAY_CHNL_LOGO.png" alt="" />
                    <img className='border-2 border-indigo-500 p-2 rounded-xl w-16 shadow-lg inline-block mr-2' src="https://tinc.id/css/tinc-revamp/img/programs/LinkAja.png" alt="" />
                    <img className='border-2 border-indigo-500 p-2 rounded-xl w-16 shadow-lg inline-block mr-2' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/1199px-Bank_Central_Asia.svg.png" alt="" />
                    <img className='border-2 border-indigo-500 p-2 rounded-xl w-16 shadow-lg inline-block mr-2' src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/2560px-Bank_Mandiri_logo_2016.svg.png" alt="" />
                    <img className='border-2 border-indigo-500 p-2 rounded-xl w-16 shadow-lg inline-block mr-2' src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhYsyv4UA-58UwYOZxQkdwwSrVlVjZcGajjCtjEd-YWK7AqfQrews1lBD10b293OP2DpM20khn41fjrFkkcclTnkoL_TihZblHW0pNeCOXrUXbr37eyEm2Dk4NYMnVVAfFgBmXWI_GndaxKf5-Aucv6fxH1EuVDDo3y6ZrV8LR2RMDFq0DH-_D4yK22Ig/w320-h102/Sea%20Bank.png" alt="" />
                  </marquee>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">© {currentYear} <a href="/" className="text-gray-500 no-underline hover:underline">winxshopeid</a>. All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <a href="/" className="text-gray-500 hover:text-gray-900" target="_blank" rel="noopener noreferrer">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              <span className="sr-only">Facebook page</span>
            </a>
            <a href="/" className="text-gray-500 hover:text-gray-900" target="_blank" rel="noopener noreferrer">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
              <span className="sr-only">Instagram page</span>
            </a>
            <a href="/" className="text-gray-500 hover:text-gray-900" target="_blank" rel="noopener noreferrer">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
              <span className="sr-only">Twitter page</span>
            </a>
          </div>
        </div>
      </footer>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#5000ca" fill-opacity="0.7" d="M0,224L34.3,224C68.6,224,137,224,206,224C274.3,224,343,224,411,213.3C480,203,549,181,617,149.3C685.7,117,754,75,823,80C891.4,85,960,139,1029,138.7C1097.1,139,1166,85,1234,80C1302.9,75,1371,117,1406,138.7L1440,160L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path>
        </svg>
      </div>
    </>
  )
}

export default FooterBot