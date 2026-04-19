import type { ProfileApi } from '@/shared/api/profile/types'

export const mapUser = (api: ProfileApi) => ({
    id: api.id,
    name: api.username,
    email: api.email || '',
})