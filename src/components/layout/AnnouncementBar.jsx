import { siteConfig } from '../../data/siteConfig';
export default function AnnouncementBar() {
  return <div className="announce" role="note"><strong>Demo.</strong> {siteConfig.demoNotice}</div>;
}
