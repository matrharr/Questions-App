// state = [
//     questions: [ question, question ],
//     currentQuestion: questions[0],
//     selectedOption: null,
//     prevDisabled: true,
//     nextDisabled: False,
//     emptyOptions: { optionId:false, optionId:true },
//     DEPRECATED targets: { questionId: {targetId:null, targetId:option} }
//     targets: { questionId: [null, option] }
// ]
const initialState = [
    'targets': {},
    'emptyOptions': {},
    'nextDisabled': false,
    'prevDisabled': true,
];

const rootReducer = (state = initialState, action) => {
    let idx;
    let prevDisabled;
    let nextDisabled;
    let targets = {};
    let emptyOptions = {};
    let questionTargets = {};
    let oldTargetId;
    let newTargetId;
    let qId;
    let selectedOption;
    let lastIndex;
    let oldTargetValue;
    switch (action.type) {
        case 'RESET':
            Object.keys(state.targets).map((key) =>{
                state.targets[key] = [null, null, null, null, null];
            })
            return { ...state, emptyOptions: {}, selectOption: null };
        case 'ARROW_DOWN':
            selectedOption = state.selectedOption;
            qId = selectedOption.question_id;
            lastIndex = state.targets[qId].length - 1;
            if (state.targets[qId][lastIndex] && state.targets[qId][lastIndex].id === selectedOption.id) {
                return { ...state };
            }
            state.targets[qId].map((target, index) => {
                if (target && target.id === selectedOption.id) {
                    oldTargetId = index;
                }
            })
            oldTargetValue = null;
            if (state.targets[qId][oldTargetId+1]) {
                oldTargetValue = state.targets[qId][oldTargetId+1]
            }
            questionTargets = Object.assign([...state.targets[qId]], {[oldTargetId+1]: selectedOption, [oldTargetId]: oldTargetValue})
            targets = { ...state.targets, [qId]: questionTargets};
            return { ...state, targets: targets };
        case 'ARROW_UP':
            selectedOption = state.selectedOption;
            qId = selectedOption.question_id;
            if (state.targets[qId][0] && state.targets[qId][0].id === selectedOption.id) {
                return { ...state };
            }
            state.targets[qId].map((target, index) => {
                if (target && target.id === selectedOption.id) {
                    oldTargetId = index;
                }
            })
            oldTargetValue = null;
            if (state.targets[qId][oldTargetId-1]) {
                oldTargetValue = state.targets[qId][oldTargetId-1]
            }
            questionTargets = Object.assign([...state.targets[qId]], {[oldTargetId-1]: selectedOption, [oldTargetId]: oldTargetValue})
            targets = { ...state.targets, [qId]: questionTargets};
            return { ...state, targets: targets };
        case 'ARROW_LEFT':
            selectedOption = state.selectedOption;
            qId = selectedOption.question_id;
            state.targets[qId].map((target, index) => {
                if (target && target.id === selectedOption.id) {
                    newTargetId = index;
                }
            })
            emptyOptions = { ...state.emptyOptions, [selectedOption.id]: false }
            questionTargets = Object.assign([...state.targets[qId]], {[newTargetId]: null});
            targets = { ...state.targets, [qId]: questionTargets};
            return { ...state, targets: targets, emptyOptions: emptyOptions  }
        case 'ARROW_RIGHT':
            selectedOption = state.selectedOption;
            qId = selectedOption.question_id;
            if (state.emptyOptions[selectedOption.id]) {
                return { ...state };
            }
            idx = 0;
            while (idx < Object.keys(state.targets[qId]).length) {
                if (state.targets[qId][idx] === null) {
                    newTargetId = idx;
                    idx = Object.keys(state.targets[qId]).length;
                }
                idx ++
            }
            questionTargets = Object.assign([...state.targets[qId]], {[newTargetId]: selectedOption});
            targets = { ...state.targets, [qId]: questionTargets};
            emptyOptions = { ...state.emptyOptions, [selectedOption.id]: true};
            return { ...state, targets:targets, emptyOptions: emptyOptions };
        case 'DROP_OPTION':
            newTargetId = action.payload.id;
            const option = action.payload.option;
            qId = option.question_id;
            state.targets[qId].map((target, index) => {
                if (target && target.id === option.id) {
                    oldTargetId = index;
                }
            })
            if (oldTargetId === 0 || oldTargetId) {
                questionTargets = Object.assign([...state.targets[qId]], {[newTargetId]: option, [oldTargetId]: null})
            } else {
                questionTargets = Object.assign([...state.targets[qId]], {[newTargetId]: option})
            }

            targets = { ...state.targets, [qId]: questionTargets};
            emptyOptions = { ...state.emptyOptions, [option.id]: true}
            return { ...state, targets: targets, emptyOptions: emptyOptions };
        case 'LOAD_REQUEST_DATA':
            const questions = action.data;
            questions.map(q => {
                targets[q.id] = []
                q.options.map(opt => {
                    targets[q.id].push(null);
                    emptyOptions[opt.id] = false;
                })
            })
            return {
                        ...state,
                        questions: questions,
                        currentQuestion: questions[0],
                        prevDisabled: true,
                        nextDisabled: false,
                        targets: targets,
                        emptyOptions: emptyOptions,
                    };
        case 'SELECT_OPTION':
            return { ...state, selectedOption: action.option };
        case 'NEXT_QUESTION':
            idx = state.questions.indexOf(state.currentQuestion) + 1;
            const nextQuestion = state.questions[idx];
            if (idx === state.questions.length - 1) {
                nextDisabled = true;
                prevDisabled = false;
            } else {
                nextDisabled = false;
                prevDisabled = false;
            }
            return {
                        ...state,
                        currentQuestion: nextQuestion,
                        nextDisabled: nextDisabled,
                        prevDisabled: prevDisabled,
                   };
        case 'PREV_QUESTION':
            idx = state.questions.indexOf(state.currentQuestion) - 1;
            const prevQuestion = state.questions[idx];
            if (idx === 0) {
                prevDisabled = true;
                nextDisabled = false;
            } else {
                nextDisabled = false;
                prevDisabled = false;
            }
            return {
                        ...state,
                        currentQuestion: prevQuestion,
                        nextDisabled: nextDisabled,
                        prevDisabled: prevDisabled,
                   };
        default:
            return state;
    }
}

export default rootReducer;
