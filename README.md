# @pocketminers/core

## Overview

This package is part of the Pocket Miners project, which is a collection of tools and libraries for building and managing decentralized applications on the Pocket Network.

### Hierarchy

1. **Templates**: The interfaces and types used in the project. Templates make up the bases of the *Components*.
2. **Components**: Classes that implement the *Templates*.
    -  The *Base Components* are the most basic components that implement the *Templates*.
    -  The *Common Components* are then constructed using the *Base Components*.
3. **Services**: Classes that implement the *Components* and provide additional functionality.

4. **Utils**: Utility functions that are used throughout the project.

#### Development procession:
```text
Peer
└── Services
    └── Components
        └── Base Component Object
            └── Templates
```