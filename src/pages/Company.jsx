import FeaturePageTemplate from '../components/common/FeaturePageTemplate'
import { featureNavGroups, featurePagesContent } from '../data/featurePagesContent'

function Company() {
  return <FeaturePageTemplate content={featurePagesContent.company} navItems={featureNavGroups.ambassador} />
}

export default Company
