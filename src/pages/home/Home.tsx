import Navbar from "@/components/Navbar";
import { AppUrl } from "@/lib/appData";
import { useEffect, useState } from "react";
import { Help } from "@/types/apiModels";
import { timeAgo } from "@/lib/utils";
import { Link } from "react-router";

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
            <div className="py-3 flex justify-evenly flex-wrap bg-gray-50">
                <div className="border w-[47%] md:w-1/3 flex flex-col rounded-md p-4 bg-white">
                    <svg className="fill-green-500 ms-1" width="20" height="20" fill="inherit" viewBox="0 0 16 16">
                        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                    </svg>
                    <span className="font-bold text-lg mt-3">5,71,489</span>
                    <span className="text-sm text-zinc-700">Active Locations</span>
                </div>
                <div className="border w-[47%] md:w-1/3 flex flex-col rounded-md p-4 bg-white">
                    <svg className="fill-red-500 ms-1" width="20" height="20" fill="inherit" viewBox="0 0 16 16">
                        <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.48 1.48 0 0 1 0-2.098zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z"/>
                        <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                    </svg>
                    <span className="font-bold text-lg mt-3">5,719</span>
                    <span className="text-sm text-zinc-700">Critical Alerts</span>
                </div>
            </div>
            
            {helpList && (
                <div className="mx-2 my-3 md:mx-20 flex flex-col gap-3">
                    {helpList?.map((item) => (
                        <Link to={`/track/${item._id}`} className={`border p-4 rounded-md ${item.status === 'sos' && 'bg-red-600 text-white fill-white'}`}>
                            <div className="flex justify-between">
                                <span className="font-bold capitalize">{item.user.name}</span>
                                <svg className="me-4 my-auto" width="15" height="15" fill="inherit" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                                </svg>
                            </div>
                            <div className="capitalize">{item.user.address}</div>
                            <div className="flex justify-between mt-1 text-sm">
                                {item.active  ? (
                                    <span className="text-green-500 fill-green-500 flex gap-2">
                                        <svg className="my-auto" width="8" height="8" fill="inherit" viewBox="0 0 16 16">
                                            <circle cx="8" cy="8" r="8"/>
                                        </svg>
                                        <span>Active</span>
                                    </span>
                                ):
                                (
                                    <span className="text-gray-500 fill-gray-500 flex gap-2">
                                        <svg className="my-auto" width="8" height="8" fill="inherit" viewBox="0 0 16 16">
                                            <circle cx="8" cy="8" r="8"/>
                                        </svg>
                                        <span>Closed</span>
                                    </span>
                                )}
                                <span>{timeAgo(new Date(item.createdAt))}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
       </>
    )
}