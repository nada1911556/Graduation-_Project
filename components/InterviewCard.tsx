import React from 'react'
import dayjs from "dayjs"
import Image from "next/image";
import {getRandomInterviewCover} from "@/lib/utils";
import Link from "next/link";
import DisblayTechIcons from "@/constants/DisblayTechIcons";


const InterviewCard = ({InterviewId,userId,techstack,type,role,createdAt}:InterviewCardProps ) => {
    const feedback=null as Feedback | null;
    const normalizeType=/mix/gi.test(type)?'Mixed':type;
    const formdata=dayjs(feedback?.createdAt|| createdAt || Date.now()).format('YYYY-MM-DD');
    return (
        <div className="card-border w-[360px] max-sm:w-full min-h-96">
            <div className="card-interview">
                <div>
                    <div className="absolute top-0 w-fit right-0 px-4 py-2 rounded-bl-lg bg-light-400">
                        <p className="badge-text">{normalizeType}</p>
                    </div>
                    <Image src={getRandomInterviewCover()} alt="cover" width={90} height={90} className="rounded-full object-fit size-[90px]"/>
                    <h3 className="mt-5 capitalize">
                        {role} Interview
                    </h3>
                    <div className="flex flex-row mt-3 gap-5">
                        <div className=" flex gap-2 flex-row">
                            <Image src="/calendar.svg" alt="logo" width={22} height={22} />
                            <p>{formdata}</p>
                        </div>
                        <div className=" flex gap-2 flex-row">
                            <Image src="/star.svg" alt="star" width={22} height={22} />
                            <p>{feedback?.totalScore || '---'}/100</p>
                        </div>
                    </div>
                    <p className="line-clamp-2 mt-5">
                        {feedback?.finalAssessment ||"you haven't taken any interview yet take it now to improve your skill"}
                    </p>
                </div>
                <div className="flex flex-row justify-between ">
                    <DisblayTechIcons techStack={techstack}/>
                    <button className="btn-primary">
                        <Link href={feedback? `/interview/${InterviewId}/feedback`
                            :`/interview/${InterviewId}`
                        }>
                            {feedback?'check feedback' :'view Interview'}
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default InterviewCard
