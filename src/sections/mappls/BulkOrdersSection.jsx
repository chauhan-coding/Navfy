import { motion } from 'framer-motion';
import Button from '../../components/common/Button';
import { bulkOrdersSection } from '../../data/maplsGadgetsContent';

export default function BulkOrdersSection() {
  return (
    <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-cyan-400/30 via-cyan-500/20 to-cyan-400/30">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/40 to-cyan-400/40" aria-hidden="true" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            {bulkOrdersSection.heading}
          </h2>
          <p className="text-white text-lg mb-10 max-w-2xl mx-auto drop-shadow-md font-medium">
            {bulkOrdersSection.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="primary" colorScheme="black" size="md" animate className="shadow-lg">
              {bulkOrdersSection.ctaPrimary}
            </Button>
            <Button
              variant="outline"
              colorScheme="black"
              size="md"
              animate
              className="!border-white !text-white hover:!bg-white hover:!text-cyan-600 shadow-lg"
            >
              {bulkOrdersSection.ctaSecondary}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
