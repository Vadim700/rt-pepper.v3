'use client';

interface Props {
  className?: string;
  id: number;
  onClickDelete: (id: number) => void;
}

export const DeleteButton: React.FC<Props> = ({
  id,
  className,
  onClickDelete,
}) => {
  const deleteClick = () => {
    onClickDelete(id);
  };

  return (
    <button className={className} onClick={deleteClick}>
      X
    </button>
  );
};
