export const SearchInput = () => {
    return (
        <div className="bg-[#EDEFF2] focus-within:ring-2 focus-within:ring-[#C65D6D] rounded-full px-4 py-3 flex items-center gap-3">
            <span className="text-gray-400">🔍</span>
            <input
                placeholder="Поиск мероприятий"
                className="bg-transparent outline-none text-sm w-full"
            />
        </div>
    )
}