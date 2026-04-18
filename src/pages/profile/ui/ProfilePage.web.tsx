export const ProfilePage = () => {
    return (
        <div className="profile">
            {/* карточка профиля */}
            <div className="profile__card">
                <img
                    src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
                    className="profile__image"
                />

                <div className="profile__name">Maria, 23</div>
            </div>

            {/* статистика */}
            <div className="profile__stats">
                <div className="profile__stat">
                    <div>❤️</div>
                    <div>low</div>
                    <div className="text-xs text-gray-400">Popularity</div>
                </div>

                <div className="profile__stat">
                    <div>➕</div>
                    <div>1,250</div>
                    <div className="text-xs text-gray-400">Credits</div>
                </div>

                <div className="profile__stat">
                    <div>💎</div>
                    <div>OFF</div>
                    <div className="text-xs text-gray-400">Subscription</div>
                </div>
            </div>


        </div>
    )
}