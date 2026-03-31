import { useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import SolutionCard from '../components/SolutionCard'
import { sectionHeadings } from '../data/siteContent'

function SolutionsSection({ tabs }) {
  const [activeTab, setActiveTab] = useState(tabs[0].key)
  const activeItem = tabs.find((tab) => tab.key === activeTab) ?? tabs[0]

  return (
    <section id="solutions" className="section-gap pt-0">
      <div className="container-shell">
        <SectionHeading
          eyebrow={sectionHeadings.solutions.eyebrow}
          title={sectionHeadings.solutions.title}
          description={sectionHeadings.solutions.description}
        />

        <div className="mt-10 flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={[
                'rounded-full px-5 py-3 text-sm font-semibold transition',
                activeTab === tab.key
                  ? 'bg-[var(--accent)] text-white'
                  : 'glass-panel text-[var(--text)] hover:border-[var(--line-strong)]',
              ].join(' ')}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          <SolutionCard
            title={activeItem.title}
            description={activeItem.description}
            items={activeItem.items}
            image={activeItem.image}
          />
        </div>
      </div>
    </section>
  )
}

export default SolutionsSection