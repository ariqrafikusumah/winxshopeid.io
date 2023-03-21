import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

function NotFound() {
    return (
        <>
            <div className="h-screen bg-gradient-to-b from-blue-900 to-gray-700 flex flex-col justify-center items-center">
                <motion.div
                    initial={{ y: -250 }}
                    animate={{ y: -10 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
                    className="text-5xl md:text-8xl font-bold text-white mb-2"
                >
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                </motion.div>
                <motion.div
                    initial={{ y: -250 }}
                    animate={{ y: -10 }}
                    transition={{ delay: 0.5, type: 'spring', stiffness: 120 }}
                    className="text-2xl md:text-4xl font-bold text-white mb-2"
                >
                    Oops! Page not found
                </motion.div>
                <motion.p
                    initial={{ y: -250 }}
                    animate={{ y: -10 }}
                    transition={{ delay: 0.8, type: 'spring', stiffness: 120 }}
                    className="text-xl md:text-2xl font-bold text-white mb-8"
                >
                    The page you are looking for Coming soon or Empty URL.
                </motion.p>
                <Link
                    to="/"
                    className="text-lg md:text-xl bg-white text-blue-900 py-2 md:py-3 px-4 md:px-6 rounded-full font-bold shadow-lg"
                >
                    Go to Home
                </Link>
            </div>
        </>
    )
}

export default NotFound