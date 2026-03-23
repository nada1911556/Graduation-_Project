import React from 'react'
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import InterviewCard from "@/components/InterviewCard";
import {dummyInterviews} from "@/constants";

const Page = () => {
    return (
        <>
            <section className="card-cta">
                <div className="max-w-lg flex flex-col gap-6">
                    <h2>Get Interview Ready With AI-Powered Practise & Feedback</h2>
                    <p className="text-lg">
                        Practise on Real Interview Question & get Instant Feedback
                    </p>
                    <Button asChild className="btn-primary max-sm:w-full" type="submit">
                        <Link href="/interview">start an Interview</Link>
                    </Button>
                </div>
                <Image src="/robot.png" alt="robot-dude" width={400} height={400} className="max-sm:hidden"/>

            </section>
            <section className="flex flex-col gap-6 mt-8">
                <h2>Your Interview</h2>
                <div className="interviews-section">
                    {dummyInterviews.map((interview) => (
                        <InterviewCard {...interview} key={interview.id} />
                    ))}
                    {/*<p>you do not have any interview</p>*/}
                </div>
            </section>
            <section className="flex flex-col gap-6 mt-8">
                <h2>Take an interview</h2>
                <div className="interviews-section">
                    {dummyInterviews.map((interview) => (
                        <InterviewCard {...interview} key={interview.id}/>
                    ))}
                </div>
            </section>
            <section className="flex flex-col gap-6 mt-8">
                <h2>Take an interview</h2>
                <div className="interviews-section">
                    {dummyInterviews.map((interview) => (
                        <InterviewCard {...interview} key={interview.id}/>
                    ))}
                </div>
            </section>

        </>
    )
}
export default Page
