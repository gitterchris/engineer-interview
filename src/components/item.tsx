interface ItemProps {
  children?: React.ReactNode;
}

const Item = ({ children }: ItemProps) => {
  return (
    <div className="flex items-center gap-4 bg-white rounded-xl p-3 shadow-sm">
      {children}
    </div>
  );
}

export default Item;
