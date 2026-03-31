import { motion } from 'framer-motion';
import { newsData } from '../../data/maplsGadgetsContent';

export default function NewsSection() {
  return (
    <section className="bg-black py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Mappls Gadgets in the <span className="text-cyan-400">news</span>
          </h2>
        </motion.div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsData.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-cyan-500/50 transition-colors duration-300 cursor-pointer group"
            >
              {/* Publication Logo Container */}
              <div className="h-16 mb-6 flex items-center justify-center bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors duration-300">
                <div className="text-sm font-bold text-gray-400 text-center px-2">
                  {article.publication}
                </div>
              </div>

              {/* Article Headline */}
              <h3 className="text-base font-bold text-white mb-4 line-clamp-3 group-hover:text-cyan-400 transition-colors duration-300">
                {article.headline}
              </h3>

              {/* Category Badge */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                  {article.category}
                </span>
                <span className="text-gray-600 text-sm">→</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
