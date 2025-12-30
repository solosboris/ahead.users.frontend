import { defineStore } from 'pinia'
import { getRandom, getUsers } from '../services/rest'

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

export const useUsersStore = defineStore('users', {
    state: () => ({
        users: [] as User[],
        loading: false,
        error: null as string | null
    }),

    actions: {
        async load() {
            this.loading = true
            this.error = null
            try {
                const res = await getUsers()
                this.users = res.data
            } catch {
                this.error = 'Users store failed to load users'
            } finally {
                this.loading = false
            }
        },

        async randomUser() {
            this.loading = true
            this.error = null
            try {
                await getRandom()
                await this.load()
            } catch {
                this.error = 'Users random user failed to be created'
            } finally {
                this.loading = false
            }
        }
    }

})