import { maplsGadgetsFooterData } from '../../data/maplsGadgetsContent';

export default function MaplsGadgetsFooter() {
  return (
    <footer className="bg-black border-t border-gray-800">
      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
          {/* Trackers Column */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              {maplsGadgetsFooterData.trackers.title}
            </h3>
            <ul className="space-y-2">
              {maplsGadgetsFooterData.trackers.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-cyan-400 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Dash-Cameras Column */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              {maplsGadgetsFooterData.dashCameras.title}
            </h3>
            <ul className="space-y-2">
              {maplsGadgetsFooterData.dashCameras.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-cyan-400 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navi-tainment Column */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              {maplsGadgetsFooterData.naviTainment.title}
            </h3>
            <ul className="space-y-2">
              {maplsGadgetsFooterData.naviTainment.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-cyan-400 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Smart Internet Kids Column */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              {maplsGadgetsFooterData.smartKids.title}
            </h3>
            <ul className="space-y-2">
              {maplsGadgetsFooterData.smartKids.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-cyan-400 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links Column */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Follow Us
            </h3>
            <ul className="space-y-2">
              {maplsGadgetsFooterData.bottom.socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-cyan-400 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-12 pt-8"></div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-xs font-medium">
          {maplsGadgetsFooterData.bottom.copyright}
        </div>
      </div>
    </footer>
  );
}
