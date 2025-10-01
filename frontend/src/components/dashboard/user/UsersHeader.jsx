import React, { useMemo } from "react";
import { Users, UserPlus, UserCheck, TrendingDown } from "lucide-react";
import { useAllUsersQuery } from "../../../redux/slices/UserApi";
import { useTranslation } from "react-i18next";

const UsersHeader = () => {
  const { t } = useTranslation("users");
  const { data: allUsers = [], isLoading, isError } = useAllUsersQuery();

  // Calculate stats dynamically
  const stats = useMemo(() => {
    if (!allUsers || allUsers.length === 0) {
      return [
        {
          title: t("users.header.stats.totalUsers.title"),
          description: t("users.header.stats.totalUsers.description"),
          value: "0",
          icon: <Users size={18} />,
          color: "from-[#1446b3] to-green-500"
        },
        {
          title: t("users.header.stats.newUsers.title"),
          description: t("users.header.stats.newUsers.description"),
          value: "0",
          icon: <UserPlus size={18} />,
          color: "from-green-500 to-[#1446b3]"
        },
        {
          title: t("users.header.stats.activeUsers.title"),
          description: t("users.header.stats.activeUsers.description"),
          value: "0",
          icon: <UserCheck size={18} />,
          color: "from-[#1446b3] to-fuchsia-500"
        },
        {
          title: t("users.header.stats.churnRate.title"),
          description: t("users.header.stats.churnRate.description"),
          value: "0%",
          icon: <TrendingDown size={18} />,
          color: "from-rose-500 to-[#1446b3]"
        }
      ];
    }

    const totalUsers = allUsers.length;

    const newUsers = allUsers.filter((u) => {
      const created = new Date(u.createdAt);
      const diffDays = (Date.now() - created.getTime()) / (1000 * 60 * 60 * 24);
      return diffDays <= 7;
    }).length;

    const activeUsers = allUsers.filter((u) => u.isActive).length;
    const churnRate = totalUsers > 0
      ? `${Math.round((allUsers.filter(u => u.isDeleted).length / totalUsers) * 100)}%`
      : "0%";

    return [
      {
        title: t("users.header.stats.totalUsers.title"),
        description: t("users.header.stats.totalUsers.description"),
        value: totalUsers,
        icon: <Users size={18} />,
        color: "from-[#1446b3] to-green-500"
      },
      {
        title: t("users.header.stats.newUsers.title"),
        description: t("users.header.stats.newUsers.description"),
        value: newUsers,
        icon: <UserPlus size={18} />,
        color: "from-green-500 to-[#1446b3]"
      },
      {
        title: t("users.header.stats.activeUsers.title"),
        description: t("users.header.stats.activeUsers.description"),
        value: activeUsers,
        icon: <UserCheck size={18} />,
        color: "from-[#1446b3] to-fuchsia-500"
      },
      {
        title: t("users.header.stats.churnRate.title"),
        description: t("users.header.stats.churnRate.description"),
        value: churnRate,
        icon: <TrendingDown size={18} />,
        color: "from-rose-500 to-[#1446b3]"
      }
    ];
  }, [allUsers, t]);

  if (isLoading) return <p className="text-center text-gray-500">{t("users.header.loading")}</p>;
  if (isError) return <p className="text-center text-red-500">{t("users.header.error")}</p>;

  return (
    <div className="w-full sm:px-6 md:px-8 py-6">
      <h2 className="text-3xl font-extrabold text-[#1a4480] md:text-4xl">
        {t("users.header.pageTitle")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-5">
        {stats.map((stat, index) => (
        <div
  key={index}
  className="p-3 sm:p-5 rounded-xl border border-[#1446b3] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white flex flex-col justify-between h-full"
>
  <div className="flex items-start gap-3 sm:gap-4 flex-1 mt-3">
    <div
      className={`p-3 sm:p-4 rounded-lg bg-gradient-to-r ${stat.color} text-white font-bold shadow-md flex items-center justify-center flex-shrink-0`}
      title={stat.description}
    >
      {stat.icon}
    </div>
    <div className="flex-1">
      <p className="text-xs sm:text-sm font-medium text-gray-500 mb-1 truncate">
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
  <p className="mt-2 text-xs sm:text-sm text-gray-400 truncate">{stat.description}</p>
</div>

        ))}
      </div>
    </div>
  );
};

export default UsersHeader;
