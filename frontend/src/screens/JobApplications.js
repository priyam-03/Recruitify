import { useState, useEffect } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';
import '../styles/jobApplication.css'
import CreateJob from '../Jobs/CreateJobs';
import JobForms from '../Jobs/JobForm';
import { useSelector } from 'react-redux';
const JobApplicationPage = () => {
    const [activeSection, setActiveSection] = useState('my-jobs');
    const { userInfo } = useSelector((state) => state.auth);
    const renderContent = () => {
        switch (activeSection) {
            case 'create-job':
                return <CreateJob/>;
            case 'my-jobs':
                return <JobForms type={'my'}/>;
            case 'all-jobs':
                return  <JobForms type={'all'}/>;
            default:
                return <div>Job content here...</div>;
        }
    }

    const handleButtonClick = (section) => {
        setActiveSection(section);
    }
    return (
        <div className='job-container'>
            {userInfo &&
                <>
                    <div className="job-left-column">
                        <button
                            className={`job-left-column-buttons ${activeSection === 'create-job' ? 'active' : ''}`}
                            onClick={() => handleButtonClick('create-job')}
                        >
                            Create New Jobs
                        </button>
                        <button
                            className={`job-left-column-buttons ${activeSection === 'my-jobs' ? 'active' : ''}`}
                            onClick={() => handleButtonClick('my-jobs')}
                        >
                            My Jobs
                        </button>
                        <button
                            className={`job-left-column-buttons ${activeSection === 'all-jobs' ? 'active' : ''}`}
                            onClick={() => handleButtonClick('all-jobs')}
                        >
                            All-Jobs
                        </button>
                    </div>
                    <div className="job-right-column">
                        <div>
                            {renderContent()}
                        </div>
                    </div>

                </>
            }
        </div>
    );
};

export default JobApplicationPage;