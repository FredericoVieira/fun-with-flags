type GridProps = {
  children: React.ReactNode;
};

const Grid = ({ children }: GridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
      {children}
    </div>
  );
};

export default Grid;
