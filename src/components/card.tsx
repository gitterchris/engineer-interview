interface CardProps {
  title: string;
  children?: React.ReactNode;
}

const Card = ({ title, children }: CardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 min-h-96">
      <h2 className="text-2xl font-medium text-center mb-6">{title}</h2>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

export default Card;
