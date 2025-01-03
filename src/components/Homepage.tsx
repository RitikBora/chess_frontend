
import { motion } from "framer-motion"
import { Carousel } from "./Carousel"

export const HomePage = () => {
    return (
        <motion.div 
            className="flex flex-col gap-20 pt-20 overflow-x-hidden"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div 
                className="flex justify-center text-6xl text-amber-50 font-bold"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
            >
                Chess Mates
            </motion.div>
            <Carousel />
        </motion.div>
    )
}