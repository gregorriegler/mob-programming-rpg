# Driver to Typing Rename Analysis

This document analyzes all occurrences of "Driver" in the codebase that need to be renamed to "Typing".

## Summary
Found 237 total occurrences of "Driver" across the codebase.

## Files to be modified:

### Core Application Files:
1. **webapp/src/model/Roles.ts** - Role type definition and role details
2. **webapp/src/model/Game.ts** - Game logic constants and methods
3. **webapp/src/model/Player.spec.ts** - Test file with role references
4. **webapp/src/model/Game.spec.ts** - Test file with game logic tests
5. **webapp/src/Help.tsx** - UI component showing next driver
6. **webapp/src/PlayerDisplay.spec.tsx** - Test file for player display
7. **webapp/src/RoleSheet.tsx** - Role sheet component
8. **webapp/src/RoleSheet.spec.tsx** - Test file for role sheet
9. **webapp/src/MobProgrammingRPG.spec.tsx** - Main app test file
10. **webapp/src/MobProgrammingRPG.integration.spec.tsx** - Integration tests
11. **webapp/src/EarnPointsForRoleForm.tsx** - Form component (variable name)
12. **webapp/src/Badge.tsx** - Badge component with image mapping
13. **webapp/src/Settings.tsx** - Settings component

### Documentation Files:
14. **docs/backlog.md** - Feature backlog mentions
15. **docs/discussion-with-willem-larsen.md** - Discussion notes
16. **session-notes/** - Multiple session note files mentioning Driver role

### Files to exclude (node_modules):
- All files in `webapp/node_modules/` contain unrelated "Driver" references from third-party libraries
- These should NOT be modified as they are external dependencies

## Key Areas of Change:

### 1. Type Definitions
- `webapp/src/model/Roles.ts`: Role type union and role details object

### 2. Constants
- `webapp/src/model/Game.ts`: DRIVER constant and gameplay order constants

### 3. Game Logic
- Driver position methods and role index handling
- Navigation between Driver and Navigator positions

### 4. UI Components
- Role display in various components
- Badge image mapping
- Help text and instructions

### 5. Tests
- All test files that reference Driver role
- Test expectations and assertions
- Mock data and test scenarios

### 6. Documentation
- Session notes and discussion documents
- Feature backlog items

## Approach:
1. Start with core model files (Roles.ts, Game.ts)
2. Update test files to match new role name
3. Update UI components
4. Update documentation files
5. Run tests to ensure everything works correctly