import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ProfileView } from 'src/sections/profile/View/ProfileView';

// ----------------------------------------------------------------------

export default function ProfilePage() {
  return (
    <>
      <Helmet>
        <title> {`Profile - ${CONFIG.appName}`}</title>
        <meta
          name="description"
          content="Dental Admin Panel"
        />
        <meta name="keywords" content="react,material,application,dashboard,admin" />
      </Helmet>

      <ProfileView />
    </>
  );
}
