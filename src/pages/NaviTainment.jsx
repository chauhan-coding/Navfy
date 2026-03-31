import FeaturePageTemplate from '../components/common/FeaturePageTemplate'
import { featureNavGroups, featurePagesContent } from '../data/featurePagesContent'

function Navitainment() {
  return <FeaturePageTemplate content={featurePagesContent.naviTainment} navItems={featureNavGroups.gadgets} />
}

export default Navitainment
