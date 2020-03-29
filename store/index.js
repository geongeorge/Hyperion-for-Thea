
export const state = () => ({
    selected: 0,  //selected alphabet, folders should start with 1
    selectedName: "", //selected file name from sidebar
    files: []
})

export const mutations = {
    setSelected(state, selection) {
        state.selected = selection
        state.selectedName = ""
        state.files= []
    },
    setFiles(state, arr){
        state.files = arr
    },
    setSelectedFileName(state, selection) {
        state.selectedName = selection
    },
}