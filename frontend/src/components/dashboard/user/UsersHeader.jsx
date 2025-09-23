import React, { useMemo } from "react";
import { Users, UserPlus, UserCheck, TrendingDown } from "lucide-react";
import { useAllUsersQuery } from  "../../../redux/slices/UserApi";

const UsersHeader = () => {
    const { data: allUsers = [], isLoading, isError } = useAllUsersQuery();

    // Calculate stats dynamically
    const stats = useMemo(() => {
        if (!allUsers || allUsers.length === 0) {
            return [
                {
                    title: "Total Users",
                    description: "Total registered users on the platform",
                    value: "0",
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
                    title: "Active Users ",
                    description: "Users active in the last 24 hours",
                    value: "0",
                    icon: <UserCheck size={18} />,
                    color: "from-[#1446b3] to-fuchsia-500",
                },
                {
                    title: "Churn Rate",
                    description: "Percentage of users who left recently",
                    value: "0%",
                    icon: <TrendingDown size={18} />,
                    color: "from-rose-500 to-[#1446b3]",
                },
            ];
        }

        const totalUsers = allUsers.length;

        // Example calculations (replace with backend logic if needed)
        const newUsers = allUsers.filter((u) => {
            const created = new Date(u.createdAt);
            const diffDays = (Date.now() - created.getTime()) / (1000 * 60 * 60 * 24);
            return diffDays <= 7;
        }).length;

        const activeUsers = allUsers.filter((u) => u.isActive).length;
        const churnRate = totalUsers > 0 ? `${Math.round((allUsers.filter(u => u.isDeleted).length / totalUsers) * 100)}%` : "0%";

        return [
            {
                title: "Total Users",
                description: "Total registered users on the platform",
                value: totalUsers,
                icon: <Users size={18} />,
                color: "from-[#1446b3] to-green-500",
            },
            {
                title: "New Users",
                description: "Users registered in the last 7 days",
                value: newUsers,
                icon: <UserPlus size={18} />,
                color: "from-green-500 to-[#1446b3]",
            },
            {
                title: "Active Users ",
                description: "Users active in the last 24 hours",
                value: activeUsers,
                icon: <UserCheck size={18} />,
                color: "from-[#1446b3] to-fuchsia-500",
            },
            {
                title: "Churn Rate",
                description: "Percentage of users who left recently",
                value: churnRate,
                icon: <TrendingDown size={18} />,
                color: "from-rose-500 to-[#1446b3]",
            },
        ];
    }, [allUsers]);

    if (isLoading) {
        return <p className="text-center text-gray-500">Loading user stats...</p>;
    }

    if (isError) {
        return <p className="text-center text-red-500">Failed to load user stats.</p>;
    }

    return (
        <div className="w-full sm:px-6 md:px-8 py-6">
            <h2 className="text-3xl font-extrabold text-[#1a4480] md:text-4xl">Users Analytics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="p-3 mt-4 sm:p-5 rounded-xl border border-[#1446b3] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white flex flex-col justify-between"
                    >
                        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                            <div
                                className={`p-3 sm:p-4 rounded-lg bg-gradient-to-r ${stat.color} text-white font-bold shadow-md flex items-center justify-center`}
                                title={stat.description}
                            >
                                {stat.icon}
                            </div>
                            <div className="min-w-[100px]">
                                <p className="text-xs sm:text-sm font-medium text-gray-500 mb-1">
                                    {stat.title}
                                </p>
                                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1446b3]">
                                    {stat.value}
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 sm:mt-5 w-full">
                            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-500`}
                                    style={{ width: `${index === 3 ? 5 : index * 25 + 25}%` }}
                                ></div>
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
