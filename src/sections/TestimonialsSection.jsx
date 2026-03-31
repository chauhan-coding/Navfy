import PropTypes from 'prop-types'
import SectionHeading from '../components/SectionHeading'
import TestimonialCarousel from '../components/TestimonialCarousel'
import { sectionHeadings } from '../data/siteContent'

function TestimonialsSection({ testimonials }) {
  return (
    <section id="testimonials" className="section-gap pt-0">
      <div className="container-shell">
        <SectionHeading
          eyebrow={sectionHeadings.testimonials.eyebrow}
          title={sectionHeadings.testimonials.title}
          description={sectionHeadings.testimonials.description}
        />
        <div className="mt-10">
          <TestimonialCarousel items={testimonials} />
        </div>
      </div>
    </section>
  )
}

TestimonialsSection.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      quote: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

export default TestimonialsSection
