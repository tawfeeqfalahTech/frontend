import OwnerNavbar from "../../../features/dashboards/components/owner/OwnerNavbar";
import OwnerSidebar from "../../../features/dashboards/components/owner/OwnerSidebar";


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