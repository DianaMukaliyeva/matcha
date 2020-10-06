import {
    GET_MATCH,
    FETCH_MORE_MATCH,
    MATCH_ERROR,
    GET_FILTER_MATCH,
    FILTER_RESET,
    FILTER_UPDATE,
} from "../actions/types";

const initialState = {
    match: [],
    count: 6,
    iStart: 0,
    iEnd: 0,
    matches: [],
    loading: true,
    error: {},
    filter: {
        type: "",
        min_age: 18,
        max_age: 62,
        min_distance: 0,
        max_distance: 200000,
        tags: "",
        country: "",
        order: "",
        believe_cn: 1,
        believe_west: 1,
        sex_orientation: "",
    },
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    // console.log("REDUCER");
    // console.log("state", state.filter);
    switch (type) {
        case GET_MATCH:
            return {
                ...state,
                iEnd: state.iStart + state.count,
                match: payload,
                loading: false,
            };
        case GET_FILTER_MATCH:
            return {
                ...state,
                // filter: payload,
                loading: false,
            };
        case MATCH_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        case FETCH_MORE_MATCH:
            return {
                ...state,
                iStart: state.iStart + state.count,
                iEnd: state.iEnd + state.count,
                loading: false,
            };
        case FILTER_RESET:
            return {
                ...state,
                filter: {
                    type: "",
                    min_age: 17,
                    max_age: 120,
                    min_distance: 0,
                    max_distance: 200000,
                    tags: "",
                    country: "",
                    order: "",
                    believe_cn: 1,
                    believe_west: 1,
                    sex_orientation: "",
                },
                loading: false,
            };
        case FILTER_UPDATE:
            return {
                ...state,
                filter: payload,
                loading: false,
            };
        default:
            return state;
    }
}
