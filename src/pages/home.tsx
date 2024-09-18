import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { OverviewAnalyticsView } from 'src/sections/overview/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Dashboard - ${CONFIG.appName}`}</title>
        <meta
          name="description"
          content="Dental Admin Panel"
        />
        <meta name="keywords" content="react,material,application,dashboard,admin" />
      </Helmet>

      <OverviewAnalyticsView />
    </>
  );
}
