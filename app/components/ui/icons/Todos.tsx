import { propIcon } from '@/types';

export const TodosIcon = ({ className, size }: propIcon) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    stroke="currentColor"
    className={className}
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0" />
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <g id="SVGRepo_iconCarrier">
      <polygon
        points="17.866 15.509 17.866 15.509 16.886 16.489 15.906 15.511 15.906 15.511 13.949 13.554 14.926 12.577 16.883 14.534 21.774 9.64 22.754 10.617 17.866 15.509"
        style={{ fill: '#008000' }}
      />
      <rect
        x="14.454"
        y="21.443"
        width="8.303"
        height="1.383"
        style={{ fill: 'currentColor' }}
      />
      <path
        d="M2,5.74V29.449H26.909V5.74ZM25.477,28.189,3.394,28.131,3.417,7.157H25.494ZM6.151,10.951v5.534h5.534V10.951ZM10.3,15.1H7.534V12.334H10.3Zm-4.151,4.22v5.534h5.534V19.323ZM10.3,23.474H7.534V20.709H10.3ZM30,2.551V26.24H28.569L28.549,4l-22.4-.029V2.551H30Z"
        style={{ fill: 'currentColor' }}
      />
    </g>
  </svg>
);
