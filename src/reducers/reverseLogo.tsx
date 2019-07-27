const reverseLogo = (
    state = {
        cssClass: ''
    }, action: any) => {
        switch(action.type) {
            case 'REVERSE':
                state = {
                    ...state,
                    cssClass: state.cssClass ? '' : 'reversed'
                }
                break;
            default:
                break;
        }

    return state;
}

export default reverseLogo;