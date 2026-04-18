interface Props {
    active?: boolean
    children: React.ReactNode
    onClick?: () => void
}

export const Chip = ({ active, children, onClick }: Props) => {
    return (
        <button
            onClick={onClick}
            className={`
        px-4 py-2 rounded-full text-sm whitespace-nowrap
        transition-all duration-200
        active:scale-95 

        ${
                active
                    ? 'bg-[#B2EBF2] text-[#2D2D2D]'
                    : 'bg-[#EDEFF2] text-gray-500'
            }
      `}
        >
            {children}
        </button>
    )
}