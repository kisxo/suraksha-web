import Navbar from "@/components/Navbar";
import axios from "axios";
import { AppUrl } from "@/lib/appData";
import {useQuery} from '@tanstack/react-query';
import { useEffect, useState } from "react";

interface Help {
    _id: string,
    userId: string,
    phone: string,
    active: boolean,
    status: string,
    createdAt: Date
    updatedAt: Date
}

async function fetchHelps() {
    const response = await fetch(AppUrl + '/api/helps');
    const data = await response.json();
    return data;
}

export default function Home () {
    const [helpList, setHelpList] = useState<Help[]>()

    useEffect(() => {
        fetchHelps().then((data) => setHelpList(data.data));
    },[])

    return (
       <>
            <Navbar/>
            <div className="bg-red-400 h-10">
            {helpList && (
                <>
                    {helpList?.map((item) => (
                        <h2>{item.phone}</h2>
                    ))}
                </>
            )}
            </div>
       </>
    )
}