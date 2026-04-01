import ProductCard from '../components/ProductCard'
import SectionHeading from '../components/SectionHeading'
import { sectionHeadings } from '../data/siteContent'

function ProductsSection({ products }) {
  return (
    <section id="products" className="section-gap">
      <div className="container-shell">
        <SectionHeading
          eyebrow={sectionHeadings.products.eyebrow}
          title={sectionHeadings.products.title}
          description={sectionHeadings.products.description}
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard key={product.title} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductsSection
