export const Header = ({ title = 'Tinder Pet' }) => {
    return (
        <div className="flex items-center justify-between px-4 py-3">

            <div>☰</div>

            <h1 className="text-lg font-semibold text-[#C65D6D]">
                {title}
            </h1>

            <div className="flex items-center gap-3">
                🔍
                <img
                    src="https://i.pravatar.cc/40"
                    className="w-8 h-8 rounded-full"
                />
            </div>

        </div>
    )
}