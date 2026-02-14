import React from 'react';

const SectionLoader: React.FC = () => {
    return (
        <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
        </div>
    );
};

export default SectionLoader;
