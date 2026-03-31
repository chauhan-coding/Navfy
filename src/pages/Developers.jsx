import FeaturePageTemplate from '../components/common/FeaturePageTemplate'
import { featureNavGroups, featurePagesContent } from '../data/featurePagesContent'

function Developers() {
  return <FeaturePageTemplate content={featurePagesContent.developers} navItems={featureNavGroups.ambassador} />
}

export default Developers
