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

        <div className="mt-10 -mx-4 flex gap-2.5 overflow-x-auto px-4 pb-1 sm:-mx-0 sm:flex-wrap sm:overflow-x-visible sm:px-0">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={[
                'shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition duration-200',
                activeTab === tab.key
                  ? 'bg-[var(--accent)] text-white shadow-md shadow-[var(--glow)]'
                  : 'glass-panel text-[var(--text)] hover:border-[color-mix(in_srgb,var(--accent)_40%,transparent)]',
              ].join(' ')}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-6" style={{ minHeight: '320px' }}>
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