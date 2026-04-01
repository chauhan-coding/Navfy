import CodeBlock from '../components/CodeBlock'
import SectionHeading from '../components/SectionHeading'
import { sectionHeadings } from '../data/siteContent'

function ApiSection({ apis }) {
  return (
    <section id="apis" className="section-gap pt-0">
      <div className="container-shell">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow={sectionHeadings.apis.eyebrow}
              title={sectionHeadings.apis.title}
              description={sectionHeadings.apis.description}
            />
            <a
              href="/apis"
              className="btn-premium mt-8 inline-flex"
            >
              Open API playground
            </a>
          </div>
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