'use client'
import { Card } from '@nextui-org/card'
import ReactPlayer from 'react-player/youtube'
import {
    Logo,
} from "@/components/icons";
import { useEffect, useState } from 'react';

const SingleVideoPlayer = ({ videoID }) => {
    const [hasWindow, setHasWindow] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setHasWindow(true)
        }
    }, [])
    return (
        <Card className='mx-auto max-w-5xl'>
            {hasWindow &&
                < ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videoID}`}
                    playIcon={<Logo />}
                    controls={true}
                    width="100%"
                    height={"76vh"}
                />
            }
        </Card>
    )
}

export default SingleVideoPlayer