import React from "react";
import { Users, UserPlus, UserCheck, TrendingDown } from "lucide-react";

const UsersHeader = () => {
    const stats = [
        {
            title: "Total Users",
            description: "Total registered users on the platform",
            value: "150",
            icon: <Users size={18} />,
            color: "from-[#1446b3] to-green-500",
        },
        {
            title: "New Users",
            description: "Users registered in the last 7 days",
            value: "0",
            icon: <UserPlus size={18} />,
            color: "from-green-500 to-[#1446b3]",
        },
        {
            title: "Active Users",
            description: "Users active in the last 24 hours",
            value: "11",
            icon: <UserCheck size={18} />,
            color: "from-[#1446b3] to-fuchsia-500",
        },
        {
            title: "Churn Rate",
            description: "Percentage of users who left recently",
            value: "5%",
            icon: <TrendingDown size={18} />,
            color: "from-rose-500 to-[#1446b3]",
        },
    ];

    return (
        <div className="w-full  sm:px-6 md:px-8 py-6">
            <h2 className="text-3xl font-bold text-[#1a4480] md:text-4xl">User Analytics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="p-3 sm:p-5 rounded-xl border border-[#1446b3] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white flex flex-col justify-between">
                        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                            <div
                                className={`p-3 sm:p-4 rounded-lg bg-gradient-to-r ${stat.color} text-white font-bold shadow-md flex items-center justify-center`}
                                title={stat.description}>
                                {stat.icon}
                            </div>
                            <div className="min-w-[100px]">
                                <p className="text-xs sm:text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
                                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1446b3]">{stat.value}</p>
                            </div>
                        </div>

                        <div className="mt-4 sm:mt-5 w-full">
                            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-500`}
                                    style={{ width: `${index === 3 ? 5 : index * 25 + 25}%` }}></div>
                            </div>
                        </div>

                        <p className="mt-2 text-xs sm:text-sm text-gray-400">{stat.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UsersHeader;
