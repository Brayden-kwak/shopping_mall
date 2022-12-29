export const SEARCH = "SEARCH_FILTER"

const searchFilter = (value) => {
    return {
        type: SEARCH,
        value
    }
}

export default searchFilter