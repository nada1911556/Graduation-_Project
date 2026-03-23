import React from 'react'
import Agent from "@/components/Agent";

const Page = () => {
    return (<div>
        <h3 className="my-4">Interview Generation</h3>
        <Agent userName="You" key="1" userId="user1" type="generate"/>
</div>)
}
export default Page
