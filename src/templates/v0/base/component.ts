
/**
 * BaseComponents
 * This enum defines the different parts of a component.
 */
enum BaseComponents {
    Argument = 'Argument',
    Parameter = 'Parameter',
    Identity = 'Identity',
    Instance = 'Instance',
    Process = 'Process',
    Command = 'Command',
    Configuration = 'Configuration',
    Job = 'Job'
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
    type BaseComponent,
    type BaseComponentsTypes
}