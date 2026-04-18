interface Props {
    onLike: () => void
    onDislike: () => void
}

export const SwipeControls = ({ onLike, onDislike }: Props) => {
    return (
        <div className="flex justify-center gap-6 mt-4">
            <button
                onClick={onDislike}
                className="w-14 h-14 rounded-full border-2 border-red-500 text-red-500 text-xl"
            >
                ❌
            </button>

            <button
                onClick={onLike}
                className="w-14 h-14 rounded-full border-2 border-green-500 text-green-500 text-xl"
            >
                ❤️
            </button>
        </div>
    )
}