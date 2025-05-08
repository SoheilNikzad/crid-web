
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the chats page
    navigate('/chats');
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-pulse-slow">
        Loading...
      </div>
    </div>
  );
};

export default Index;
