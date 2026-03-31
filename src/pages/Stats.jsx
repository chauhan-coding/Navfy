import FeaturePageTemplate from '../components/common/FeaturePageTemplate'
import { featureNavGroups, featurePagesContent } from '../data/featurePagesContent'

function Stats() {
  return <FeaturePageTemplate content={featurePagesContent.stats} navItems={featureNavGroups.primary} />
}

export default Stats
