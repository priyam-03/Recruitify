import { useState } from 'react';

const usePostChange = () => {
    const [isChanged, setIsChanged] = useState(false);

    const triggerChange = () => {
        setIsChanged(prevState => !prevState);
    };

    return [isChanged, triggerChange];
};

export default usePostChange;
