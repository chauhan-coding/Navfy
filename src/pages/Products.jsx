import FeaturePageTemplate from '../components/common/FeaturePageTemplate'
import { featureNavGroups, featurePagesContent } from '../data/featurePagesContent'

function Products() {
  return <FeaturePageTemplate content={featurePagesContent.products} navItems={featureNavGroups.primary} />
}

export default Products
