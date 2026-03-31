import FeaturePageTemplate from '../components/common/FeaturePageTemplate'
import { featureNavGroups, featurePagesContent } from '../data/featurePagesContent'

function AboutNavfy() {
  return <FeaturePageTemplate content={featurePagesContent.aboutNavfy} navItems={featureNavGroups.gadgets} />
}

export default AboutNavfy
