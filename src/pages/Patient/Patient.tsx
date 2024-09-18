import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { PatientView } from 'src/sections/Patient/View/PatientView';

// import { PatientView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Patient - ${CONFIG.appName}`}</title>
      </Helmet>

      <PatientView />
    </>
  );
}
