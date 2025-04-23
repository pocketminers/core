/**
 * This code defines the Storage class, which is used to store and recall Components.
 * - The Storage class is a generic class that can be used with different types of components.
 * - It includes methods for adding, removing, and recalling components.
 * - The class also includes a method for checking if a component is present in the storage.
 * - The class is designed to be used with the Pocket framework and is part of the core components.
 */

import { BaseComponent } from "";

class PocketComponentStorage
<
    C extends BaseComponent,
    S extends BaseStorage<C, BaseObjectType, BaseStorageLocation>