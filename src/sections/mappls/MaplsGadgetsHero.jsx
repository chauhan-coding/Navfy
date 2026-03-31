import { motion } from 'framer-motion';
import Button from '../../components/common/Button';
import { maplsGadgetsHero } from '../../data/maplsGadgetsContent';

export default function MaplsGadgetsHero() {
  return (
    <section className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-black" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-cyan-400 font-semibold text-xs md:text-sm uppercase tracking-widest mb-6">
            {maplsGadgetsHero.eyebrow}
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {maplsGadgetsHero.title}
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            {maplsGadgetsHero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="primary" colorScheme="black" size="md" animate>
              {maplsGadgetsHero.ctaPrimary}
            </Button>
            <Button variant="outline" colorScheme="black" size="md" animate>
              {maplsGadgetsHero.ctaSecondary}
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-0 right-0 w-full md:w-1/2 h-96 md:h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1 }}
        aria-hidden="true"
      >
        <div className="w-full h-full bg-gradient-to-t from-cyan-500/20 to-transparent" />
      </motion.div>
    </section>
  );
}
