

import dayjs from 'dayjs';
import SingleVideoPlayer from './SingleVideoPlayer'
// import  from '../../../../lib/fetch-youtube.ts'
import { fetchSingleYouTubeVideo } from "@/lib/fetch-youtube";
import Breadcrumbs from '@/components/BreadCrumbs';
import { Divider } from '@nextui-org/divider';

// Function to handle description line breaks
const formatDescription = (description) => {
    return description.split('\n').map((line, index) => (
        <span key={index}>
            {line}
            <br />
        </span>
    ));
};

const page = async ({ params: { id } }) => {
    const videoDetails = await fetchSingleYouTubeVideo(id)

    return (
        <div className='mx-auto max-w-7xl'>

            <Breadcrumbs links={[]}/>
            <SingleVideoPlayer videoID={id} />
            
            <section>
                <div className='mt-10'>
                    <h3 className="text-xl font-semibold">{videoDetails.title}</h3>
                    <p className="text-gray-600">{videoDetails.channelTitle}</p>
                    <p className="text-gray-500 text-sm">
                        {dayjs(videoDetails.publishedAt).format("DD-MMM-YYYY")}
                    </p>
                </div>
                <Divider className='my-3'/>
                <p>
                    {formatDescription(videoDetails?.description)}
                </p>
            </section>
        </div>
    )
}

export default page