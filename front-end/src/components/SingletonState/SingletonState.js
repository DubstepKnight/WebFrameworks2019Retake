const userStore = {
    type: '',
    name: '',
    questions: [
        {
            question: '',
            category: ''
        }
    ],
    getInstance() { return this },
    add: () => userStore.questions.push({ question: '', category: ''}),
    remove: () => userStore.questions.pop()  
}