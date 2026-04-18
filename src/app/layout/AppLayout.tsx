import { BottomNav } from '@/widgets/bottom-navigation'

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen bg-gray-100 flex justify-center">

            {/* 📱 контейнер */}
            <div className="w-full max-w-md min-h-screen bg-white flex flex-col relative">

                {/* 🔥 ВАЖНО: убрали overflow-hidden */}
                <div className="flex-1 flex flex-col items-center justify-center px-4">
                    {children}
                </div>

                <BottomNav />
            </div>
        </div>
    )
}