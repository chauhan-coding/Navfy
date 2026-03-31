import { motion } from 'framer-motion';
import Card from '../../components/common/Card';
import SectionHeading from '../../components/common/SectionHeading';
import Button from '../../components/common/Button';
import { productsData, productsGridHeading } from '../../data/maplsGadgetsContent';
import { t } from '../../locales';

export default function ProductsGridSection() {
  return (
    <section className="bg-black py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow={productsGridHeading.eyebrow}
          title={productsGridHeading.title}
          description={productsGridHeading.description}
          align="center"
          eyebrowColor="cyan"
          className="text-white [&_h2]:text-white [&_p.section-copy]:text-gray-400"
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {productsData.map((product, index) => (
            <Card key={product.id} variant="dark" index={index} hover>
              {/* Product Image */}
              <div className="relative w-full h-56 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden rounded-t-lg">
                <span className="text-gray-600 text-xs">{t('gadgets.products.imagePlaceholder')}</span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {product.name}
                </h3>
                {product.tagline && (
                  <p className="text-gray-400 text-sm mb-4 flex-1">{product.tagline}</p>
                )}
                <div className="flex items-center justify-between pt-4 border-t border-gray-700 mt-auto">
                  <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                    {product.category}
                  </span>
                  <Button
                    variant="outline"
                    colorScheme="black"
                    size="sm"
                    className="!rounded-full border-cyan-500/40 text-cyan-400 hover:bg-cyan-500 hover:text-black text-xs px-3 py-1"
                  >
                    {t('gadgets.products.viewDetails')}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
