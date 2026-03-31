import SectionHeading from '../components/SectionHeading'
import StatsCounter from '../components/StatsCounter'
import { sectionHeadings } from '../data/siteContent'

function StatsSection({ stats }) {
  return (
    <section id="stats" className="section-gap pt-0">
      <div className="container-shell">
        <SectionHeading
          eyebrow={sectionHeadings.stats.eyebrow}
          title={sectionHeadings.stats.title}
          description={sectionHeadings.stats.description}
          align={sectionHeadings.stats.align}
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item, index) => (
            <StatsCounter key={item.label} index={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection