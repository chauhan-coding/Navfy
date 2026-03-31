import FeaturePageTemplate from '../components/common/FeaturePageTemplate'
import { featureNavGroups, featurePagesContent } from '../data/featurePagesContent'

function Testimonials() {
  return <FeaturePageTemplate content={featurePagesContent.testimonials} navItems={featureNavGroups.primary} />
}

export default Testimonials
