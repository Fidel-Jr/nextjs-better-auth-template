import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    // Check authentication
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        redirect("/login");
    }

    const user = session.user;

    return (
        <div className="min-h-screen p-6 w-full max-w-5xl mx-auto">
            {/* Simple Welcome */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h1 className="text-2xl font-bold">
                    Welcome, {user.name || user.email}!
                </h1>
                <p className="text-gray-600 mt-1">You are logged in to your dashboard.</p>
            </div>

            {/* Simple Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow p-4">
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{user.email}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <p className="text-sm text-gray-600">Member Since</p>
                    <p className="font-medium">
                        {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="font-medium text-green-600">● Active</p>
                </div>
            </div>

            {/* Simple Actions */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="font-semibold mb-4">Quick Actions</h2>
                <div className="flex gap-4 flex-wrap">
                    
                    <form action={async () => {
                        'use server';
                        await auth.api.signOut({ headers: await headers() });
                        redirect('/');
                    }}>
                        <button 
                            type="submit"
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Sign Out
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}