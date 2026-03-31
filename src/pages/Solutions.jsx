import FeaturePageTemplate from '../components/common/FeaturePageTemplate'
import { featureNavGroups, featurePagesContent } from '../data/featurePagesContent'

function Solutions() {
  return <FeaturePageTemplate content={featurePagesContent.solutions} navItems={featureNavGroups.primary} />
}

export default Solutions
