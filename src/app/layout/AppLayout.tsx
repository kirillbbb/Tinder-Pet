import {useAppStore} from "@/shared/model/store.ts";
import {useEffect} from "react";
import {BottomNav} from "@/widgets/bottom-navigation";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
    const fetchUser = useAppStore(state => state.fetchUser)
    const isAuthChecked = useAppStore(state => state.isAuthChecked)

    useEffect(() => {
        fetchUser()
    }, [])

    if (!isAuthChecked) {
        return (
            <div className="h-screen flex items-center justify-center">
                Loading...
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center">

            <div className="w-full max-w-xl min-h-screen bg-white flex flex-col relative">

                {/* ❌ УБРАЛИ items-center justify-center */}
                <div className="flex-1 flex flex-col px-4">
                    {children}
                </div>

                <BottomNav />
            </div>

        </div>
    )
}