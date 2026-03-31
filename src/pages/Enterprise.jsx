import FeaturePageTemplate from '../components/common/FeaturePageTemplate'
import { featureNavGroups, featurePagesContent } from '../data/featurePagesContent'

function Enterprise() {
  return <FeaturePageTemplate content={featurePagesContent.enterprise} navItems={featureNavGroups.ambassador} />
}

export default Enterprise
