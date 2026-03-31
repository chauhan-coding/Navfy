import FeaturePageTemplate from '../components/common/FeaturePageTemplate'
import { featureNavGroups, featurePagesContent } from '../data/featurePagesContent'

function SmartInternetKids() {
  return <FeaturePageTemplate content={featurePagesContent.smartInternetKids} navItems={featureNavGroups.gadgets} />
}

export default SmartInternetKids
