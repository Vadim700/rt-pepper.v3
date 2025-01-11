import React from 'react';

interface Props {
  className?: string;
}

export const SingUpForm: React.FC<Props> = ({ className }) => {
	return <div className={className}>
		Sign UP
	</div>;
};
