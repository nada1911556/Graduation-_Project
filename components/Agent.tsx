"use client"

import Image from "next/image";
import { cn } from "@/lib/utils";
import React from "react";

// 1. تعريف الحالة الخاصة بالمكالمة
enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECT = 'CONNECT',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED',
}

interface AgentProps {
    userName: string;
}

const message = [
    'What is your name?',
    'My name is PrepWise AI, your interviewer today.',
];
const lastMessage = message[message.length - 1];

const Agent = ({ userName }: AgentProps) => {
    // هذه القيم عادة تأتي من State أو Props في التطبيق الحقيقي
    const callStatus = CallStatus.INACTIVE;
    const isSpeaking = true;

    return (
        <>
            <div className="call-view">
                {/* كارت المحاور الآلي (AI) */}
                <div className="card-interviewer">
                    <div className="avatar">
                        <Image
                            src="/ai-avatar.png"
                            alt="AI Interviewer"
                            width={65}
                            height={54}
                            className="object-cover"
                        />
                        {/* أنيميشن التحدث */}
                        {isSpeaking && <span className="animate-speak"></span>}
                    </div>
                    <h3>AI Interviewer</h3>
                </div>

                {/* كارت المستخدم */}
                <div className="card-border">
                    <div className="card-content">
                        <Image
                            src="/user-avatar.png"
                            alt="user avatar"
                            width={540}
                            height={540}
                            className="rounded-full object-cover size-[120px]"
                        />
                        <h3>{userName}</h3>
                    </div>
                </div>
            </div>

            {/* عرض النصوص المكتوبة (Transcript) */}
            {message.length > 0 && (
                <div className="transcript-border">
                    <div className="transcript">
                        <p
                            key={lastMessage}
                            className={cn(
                                'transition-opacity duration-500 opacity-0',
                                'animate-fadeIn opacity-100'
                            )}
                        >
                            {lastMessage}
                        </p>
                    </div>
                </div>
            )}

            {/* أزرار التحكم في المكالمة */}
            <div className="w-full flex justify-center">
                {callStatus !== CallStatus.ACTIVE ? (
                    <button className="relative btn-call">
                        {/* إصلاح الخطأ: استخدام && بدلاً من & واستخدام الشروط بشكل صحيح */}
                        <span className={cn(
                            'animate-ping rounded-full opacity-75 absolute inset-0 bg-user-primary',
                            callStatus === CallStatus.CONNECT ? "block" : "hidden"
                        )}/>
                        <span className="relative">
                            {callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED ? 'Start Call' : 'Connecting...'}
                        </span>
                    </button>
                ) : (
                    <button className="btn-disconnect">
                        End Interview
                    </button>
                )}
            </div>
        </>
    )
}

export default Agent;