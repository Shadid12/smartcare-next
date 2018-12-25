import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

const exampleInitialState = {
  formName: '',
  fields: [
    {
        label: 'Blood Preasure',
        val: ''
    },
    {
        label: 'Oxygen',
        val: ''
    },
    {
        label: 'Heart Rate',
        val: ''
    }
  ],
  newPatient: {},
  items: [],
  userRole: '',
  userId: '',
  patientProfile: 0
  
}

export const actionTypes = {
  DECREMENT: 'DECREMENT',
  RESET: 'RESET',
  FIRSTNAME: 'FIRSTNAME',
  LASTNAME: 'LASTNAME',
  AGE: 'AGE',
  GENDER: 'GENDER',
  PHYSICIAN: 'PHYSICIAN',
  ALLERGIES: 'ALLERGIES',
  PRIMARYDIAGONOSIS: 'PRIMARYDIAGONOSIS',
  DELETEFIELD: 'DELETEFIELD',
  NEWPATIENT: 'NEWPATIENT',
  EMERGENCYCONTACT: 'EMERGENCYCONTACT',
  DENTURE: 'DENTURE',
  CONCENT: 'CONCENT',
  UPDATEITEMS: 'UPDATEITEMS',
  UPDATEFORMNAME: 'UPDATEFORMNAME',
  SETUSERROLE: 'SETUSERROLE',
  PATIENTPROFILE: 'PATIENTPROFILE',
  SETUSERID: 'SETUSERID'

}

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.FIRSTNAME:
      return Object.assign({}, state, {
        firstName: action.payload
      })

    case actionTypes.LASTNAME:
      return Object.assign({}, state, {
        lastName: action.payload
      })
    case actionTypes.PHYSICIAN:
      return Object.assign({}, state, {
        physician: action.payload
      })
    case actionTypes.ALLERGIES:
      return Object.assign({}, state, {
        allergies: action.payload
      })

    case actionTypes.PRIMARYDIAGONOSIS:
      return Object.assign({}, state, {
        primaryDiagonosis: action.payload
      })

    case actionTypes.GENDER:
      return Object.assign({}, state, {
        gender: action.payload
      })

    case actionTypes.AGE:
      return Object.assign({}, state, {
        age: action.payload
      })

    case actionTypes.DELETEFIELD:
      return Object.assign({}, state, {
        fields: action.payload
      })
    
    case actionTypes.NEWPATIENT:
      return Object.assign({}, state, {
        newPatient: action.payload
      })

    case actionTypes.EMERGENCYCONTACT:
      return Object.assign({}, state, {
        emergencyContact: action.payload        
      })

    case actionTypes.DENTURE: 
      return Object.assign({}, state, {
        denteture: action.payload        
      })
    case actionTypes.CONCENT:
      return Object.assign({}, state, {
        concent: action.payload        
      })
    case actionTypes.UPDATEITEMS:
      return Object.assign({}, state, {
        items: action.payload        
      })

    case actionTypes.UPDATEFORMNAME: 
      return Object.assign({}, state, {
        formName: action.payload        
      })
    case actionTypes.SETUSERROLE: 
      return Object.assign({}, state, {
        userRole: action.payload        
      })

    case actionTypes.PATIENTPROFILE: 
      return Object.assign({}, state, {
        patientProfile: action.payload
      })

    case actionTypes.SETUSERID:
      return Object.assign({}, state, {
        userId: action.payload
      })

    default: return state
  }
}

// ACTIONS
export const serverRenderClock = (isServer) => dispatch => {
  return dispatch({ type: actionTypes.TICK, light: !isServer, ts: Date.now() })
}

export const decrementCount = () => dispatch => {
  return dispatch({ type: actionTypes.DECREMENT })
}

export const resetCount = () => dispatch => {
  return dispatch({ type: actionTypes.RESET })
}

export const changeName = (payload) => dispatch => {
  return dispatch({ type: actionTypes.FIRSTNAME, payload: payload })
}

export const changeLastName = (payload) => dispatch => {
  return dispatch({ type: actionTypes.LASTNAME, payload: payload })
}

export const changeAge = (payload) => dispatch => {
  return dispatch({ type: actionTypes.AGE, payload: payload })
}

export const changeGender = (payload) => dispatch => {
  return dispatch({ type: actionTypes.GENDER, payload: payload })
}

export const changeAllergies = (payload) => dispatch => {
  return dispatch({ type: actionTypes.ALLERGIES, payload: payload })
}

export const changePrimaryDiagonosis = (payload) => dispatch => {
  return dispatch({ type: actionTypes.PRIMARYDIAGONOSIS, payload: payload })
}

export const changeEmergencyContact = (payload) => dispatch => {
  return dispatch({ type: actionTypes.EMERGENCYCONTACT, payload: payload })
}

export const changePhysician = (payload) => dispatch => {
  return dispatch({ type: actionTypes.PHYSICIAN, payload: payload })
}

export const deleteField = (payload) => dispatch => {
  return dispatch({ type: actionTypes.DELETEFIELD, payload: payload })
}

export const newPatinetAction = (payload) => dispatch => {
  return dispatch({ type: actionTypes.NEWPATIENT, payload: payload })
}

export const updateDenture = (payload) => dispatch => {
  return dispatch({ type: actionTypes.DENTURE, payload: payload })
}

export const updateConcent = (payload) => dispatch => {
  return dispatch({ type: actionTypes.CONCENT, payload: payload })
}

export const updateItems = (payload) => dispatch => {
  return dispatch({ type: actionTypes.UPDATEITEMS, payload: payload })
}

export const updateFormName = (payload) => dispatch => {
  return dispatch({ type: actionTypes.UPDATEFORMNAME, payload: payload })
}

export const setUserRole = (payload) => dispatch => {
  return dispatch({ type: actionTypes.SETUSERROLE, payload: payload })
}

export const setUserId = (payload) => dispatch => {
  return dispatch({type: actionTypes.SETUSERID, payload: payload})
}

export const changePatientProfile = (payload) => dispatch => {
  return dispatch({ type: actionTypes.PATIENTPROFILE, payload: payload })
}

export function initializeStore (initialState = exampleInitialState) {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}
