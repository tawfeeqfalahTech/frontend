import OwnerNavbar from "../../../features/dashboards/owner/home/components/OwnerNavbar";
import OwnerSidebar from "../../../features/dashboards/owner/home/components/OwnerSidebar";


export default function OwnerLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <OwnerNavbar />
            <OwnerSidebar />

            <main className="flex-1 p-6">
                {children}
            </main>
        </div>
    );
}