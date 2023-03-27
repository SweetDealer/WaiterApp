//selectors
export const getTableById = ({ tables }, tableId) => tables.find(table => table.id === tableId);

// actions
const createActionName = actionName => `app/tables/${actionName}`;
const SET_TABLES = createActionName('SET_TABLES');

// action creators
export const setTables = payload => ({ type: SET_TABLES, payload });

export const fetchTables = () => {
    return (dispatch) => {
        fetch('http://localhost:3131/api/tables')
        .then(res => res.json())
            .then(tables => {
                console.log('fetch', tables);
                return dispatch(setTables(tables))
            });
    } 
}; 

const tablesReducer = (statePart = [], action) => {
    console.log('action', action);
    switch (action.type) {
        case SET_TABLES:
            console.log('statePart', statePart);
            return [...action.payload] 
        default:
            return statePart;
    };
};
export default tablesReducer;