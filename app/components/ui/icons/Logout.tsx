import { propIcon } from '@/types';

export const LogoutIcon = ({ className, size }: propIcon) => (
  <svg
    fill="currentColor"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    id="sign-out-left-4"
    data-name="Flat Color"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      id="secondary"
      d="M17,11H7V9.86a1,1,0,0,0-1.5-.69L2.38,11.31a.82.82,0,0,0,0,1.38L5.5,14.83A1,1,0,0,0,7,14.14V13H17a1,1,0,0,0,0-2Z"
      style={{ fill: '#BC6C25' }}
    ></path>
    <path
      id="primary"
      d="M20,21H13a2,2,0,0,1-2-2V16a1,1,0,0,1,2,0v3h7V5H13V8a1,1,0,0,1-2,0V5a2,2,0,0,1,2-2h7a2,2,0,0,1,2,2V19A2,2,0,0,1,20,21Z"
      style={{ fill: '#fff' }}
    ></path>
  </svg>
);
