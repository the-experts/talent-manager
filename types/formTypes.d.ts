interface SkillFormElements extends HTMLFormControlsCollection {
    skillName: HTMLInputElement
    categoryId: HTMLInputElement
}

interface CategoryFormElements extends HTMLFormControlsCollection {
    categoryName: HTMLInputElement
}

interface SkillFormElement extends HTMLFormElement {
    readonly elements: SkillFormElements
}

interface CategoryFormElement extends HTMLFormElement {
    readonly elements: CategoryFormElements
}
