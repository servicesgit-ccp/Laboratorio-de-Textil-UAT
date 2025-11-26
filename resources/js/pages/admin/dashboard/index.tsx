import PageTitle from '@/components/PageTitle';
import MainLayout from '@/layouts/MainLayout';
import CardStats from "@/components/_admin/cards/CardStats";
import RecentActivity from "@/components/_admin/cards/RecentActivity";
import BarChart from "@/components/_admin/charts/BarChart";
import LineChart from "@/components/_admin/charts/LineChart";

const IndexDashboard = ({ cards, barChart, lineChart, recentActivities }) => {
    return (
        <MainLayout>
            <PageTitle title="Dashboard" subTitle="CCP Textil Lab" />

            {/* Grid 2x2 */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mt-6">
                <div className="col-span-3">
                    <CardStats cards={cards} />
                </div>

                <div>
                    <RecentActivity activities={recentActivities} />
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <BarChart data={barChart} />
                <LineChart data={lineChart} />
            </div>
        </MainLayout>
    );
};

export default IndexDashboard;
