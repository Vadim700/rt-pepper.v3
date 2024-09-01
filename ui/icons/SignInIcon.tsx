import { propIcon } from '@/types';

export const SignInIcon = ({ className, size }: propIcon) => (
  <svg
    fill="#000000"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    id="sign-in-alt-3"
    data-name="Line Color"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      id="secondary"
      x1="3"
      y1="12"
      x2="17"
      y2="12"
      style={{
        fill: '#BC6C25',
        stroke: '#BC6C25',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: '2',
      }}
    ></line>
    <polyline
      id="secondary-2"
      // dataТame="secondary"
      points="13 16 17 12 13 8"
      style={{
        fill: '#BC6C25',
        stroke: '#BC6C25',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: '2',
      }}
    ></polyline>
    <path
      id="primary"
      d="M9,8V4a1,1,0,0,1,1-1H20a1,1,0,0,1,1,1V20a1,1,0,0,1-1,1H10a1,1,0,0,1-1-1V16"
      style={{
        fill: 'none',
        stroke: 'rgb(255, 255, 255)',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: '2',
      }}
    ></path>
  </svg>
);
