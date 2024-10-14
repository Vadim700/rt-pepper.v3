import React from 'react';

interface Props {
	className?: string;
	post: any;
}

export const PostItem: React.FC<Props> = ({ className, post }) => {
	return (
		<div className={className}>
			{post.title}
		</div>
	);
};