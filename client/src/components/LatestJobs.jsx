import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
   
    return (
        <div className='max-w-7xl mx-auto my-20 '>
            <h1 className='text-xl text-center font-bold lg:text-5xl lg:text-start sm:text-2xl sm:text-center md:text-3xl md:text-center'><span className='text-[#90E0EF]'>Latest & Top </span> Job Openings</h1>
            <div className='grid grid-cols-1 gap-4 my-6 sm:grid sm:grid-cols-2 md:grid md:grid-cols-2 lg:grid lg:grid-cols-3 p-2'>
                {
                    allJobs.length <= 0 ? <span>No Job Available</span> : allJobs?.slice(0,6).map((job) => <LatestJobCards key={job._id} job={job}/>)
                }
            </div>
        </div>
    )
}

export default LatestJobs