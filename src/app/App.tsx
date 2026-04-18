import { AppRouter } from './router/AppRouter'
import { AppLayout } from './layout/AppLayout'

export const App = () => {
    return (
        <AppLayout>
            <AppRouter />
        </AppLayout>
    )
}