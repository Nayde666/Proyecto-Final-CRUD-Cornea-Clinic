export const state = () => ({
    newPatient: false 
})

export const mutations = {
    setNewPatient(state, newPatient) {
        state.newPatient = newPatient
    }
}