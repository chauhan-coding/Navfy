import FeaturePageTemplate from '../components/common/FeaturePageTemplate'
import { featureNavGroups, featurePagesContent } from '../data/featurePagesContent'

function DashCameras() {
  return <FeaturePageTemplate content={featurePagesContent.dashCameras} navItems={featureNavGroups.gadgets} />
}

export default DashCameras
