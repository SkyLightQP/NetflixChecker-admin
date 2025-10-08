import { FC } from 'react';
import { TriangleAlertIcon } from 'lucide-react';

const NotFound: FC = () => {
  return (
    <div className="h-[calc(100vh-300px)] flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <TriangleAlertIcon size={28} />
        <h1 className="text-lg font-bold mt-1">Not Found</h1>
      </div>
    </div>
  );
};

export default NotFound;
