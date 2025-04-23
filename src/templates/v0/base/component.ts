
/**
 * BaseComponents
 * This enum defines the different parts of a component.
 */
enum BaseComponents {
    Argument = 'Argument',
    Parameter = 'Parameter',
    Identity = 'Identity'
}


/**
 * BaseComponent
 * This type defines the different parts of a component.
 */
type BaseComponent = keyof typeof BaseComponents;


type BaseComponentsTypes = {
    [key in BaseComponent]: BaseComponentsTypes[key];
}


export {
    BaseComponents,
    BaseComponentsTypes
}