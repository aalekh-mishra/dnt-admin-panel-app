import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { DoctorView } from 'src/sections/Doctor/View/DoctorView';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Doctor - ${CONFIG.appName}`}</title>
      </Helmet>

      <DoctorView />
    </>
  );
}
