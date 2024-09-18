import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    parent: false,
    icon: icon('ic-analytics'),
  },
  {
    title: "Master",
    path: null,
    parent: true,
    icon: icon('ic-master'),
    data: [
      {
        title: "Patient",
        path: "/patient",
        icon: icon('ic-patient'),
      },
      {
        title: "Doctor",
        path: "/doctor",
        icon: icon('ic-doctor'),
      }
    ]
  },
  {
    title: "Approvals",
    path: null,
    parent: true,
    icon: icon('ic-approvals'),
    data: [
      {
        title: "Patient",
        path: "/patient-approval",
        icon: icon('ic-patient-approval'),
      },
      {
        title: "Doctor",
        path: "/doctor-approval",
        icon: icon('ic-doctor-approval'),
      }
    ]
  },
  // {
  //   title: 'Product',
  //   path: '/products',
  //   icon: icon('ic-cart'),
  //   info: (
  //     <Label color="error" variant="inverted">
  //       +3
  //     </Label>
  //   ),
  // },
  // {
  //   title: 'Blog',
  //   path: '/blog',
  //   icon: icon('ic-blog'),
  // },
  // {
  //   title: 'Sign in',
  //   path: '/sign-in',
  //   icon: icon('ic-lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic-disabled'),
  // },
];
