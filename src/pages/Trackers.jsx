import FeaturePageTemplate from '../components/common/FeaturePageTemplate'
import { featureNavGroups, featurePagesContent } from '../data/featurePagesContent'

function Trackers() {
  return <FeaturePageTemplate content={featurePagesContent.trackers} navItems={featureNavGroups.gadgets} />
}

export default Trackers
