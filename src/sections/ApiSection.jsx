import CodeBlock from '../components/CodeBlock'
import SectionHeading from '../components/SectionHeading'
import { sectionHeadings } from '../data/siteContent'

function ApiSection({ apis }) {
  return (
    <section id="apis" className="section-gap pt-0">
      <div className="container-shell">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionHeading
            eyebrow={sectionHeadings.apis.eyebrow}
            title={sectionHeadings.apis.title}
            description={sectionHeadings.apis.description}
          />
          <div className="grid gap-5">
            {apis.map((api, index) => (
              <CodeBlock key={api.title} index={index} {...api} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ApiSection